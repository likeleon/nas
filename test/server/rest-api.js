var request = require('superagent');
var utils = require('../../src/utils.js');
var app = require('../../src/server');
var baseUrl = 'http://localhost:' + app.server.address().port;
var User = require('../../src/models/user').model;

describe('rest-api', function () {
  describe('user', function () {
    describe('register', function () {
      afterEach(function () {
        User.remove({}).exec();
      });

      it('new valid user', function (done) {
        var randomId = utils.uuid();
        request
          .post(baseUrl + '/api/user/register')
          .set('Accept', 'application/json')
          .send({
            email: randomId + "@gmail.com",
            password: randomId,
            confirmPassword: randomId,
            admin: false
          })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('missing email should fail', function (done) {
        var randomId = utils.uuid();
        request
          .post(baseUrl + '/api/user/register')
          .set('Accept', 'application/json')
          .send({
            password: randomId,
            confirmPassword: randomId,
            admin: false
          })
          .end(function (err, res) {
            res.should.have.status(401);
            res.should.be.json;
            JSON.parse(res.text).err.should.equal(':email, :password, :confirmPassword, :admin required');
            done();
          });
      });

      it('password and confirmPassword mismatch should fail', function (done) {
        var randomId = utils.uuid();
        request
          .post(baseUrl + '/api/user/register')
          .set('Accept', 'application/json')
          .send({
            email: randomId + "@gmail.com",
            password: randomId,
            confirmPassword: randomId + "_mismatch",
            admin: false
          })
          .end(function (err, res) {
            res.should.have.status(401);
            res.should.be.json;
            JSON.parse(res.text).err.should.equal(':password and :confirmPassword mismatch');
            done();
          });
      });

      it('invalid email should fail', function (done) {
        var randomId = utils.uuid();
        request
          .post(baseUrl + '/api/user/register')
          .set('Accept', 'application/json')
          .send({
            email: randomId,
            password: randomId,
            confirmPassword: randomId,
            admin: false
          })
          .end(function (err, res) {
            res.should.have.status(401);
            res.should.be.json;
            JSON.parse(res.text).err.should.equal('Email is not valid');
            done();
          });
      });

      it('duplicated email should fail', function (done) {
        var randomId = utils.uuid();
        request
          .post(baseUrl + '/api/user/register')
          .set('Accept', 'application/json')
          .send({
            email: randomId + "@gmail.com",
            password: randomId,
            confirmPassword: randomId,
            admin: false
          })
          .end(function (err, res) {
            res.should.have.status(200);

            request
              .post(baseUrl + '/api/user/register')
              .set('Accept', 'application/json')
              .send({
                email: randomId + "@gmail.com",
                password: randomId,
                confirmPassword: randomId,
                admin: false
              })
              .end(function (err, res) {
                res.should.have.status(401);
                res.should.be.json;
                JSON.parse(res.text).err.should.equal('Email already taken');
                done();
              });
          });
      });

      it('admin user', function (done) {
        var randomId = utils.uuid();
        request
          .post(baseUrl + '/api/user/register')
          .set('Accept', 'application/json')
          .send({
            email: randomId + "@gmail.com",
            password: randomId,
            confirmPassword: randomId,
            admin: true
          })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('register admin user again should fail', function (done) {
        var randomId = utils.uuid();
        request
          .post(baseUrl + '/api/user/register')
          .set('Accept', 'application/json')
          .send({
            email: randomId + "@gmail.com",
            password: randomId,
            confirmPassword: randomId,
            admin: true
          })
          .end(function (err, res) {
            res.should.have.status(200);

            randomId = utils.uuid();
            request
              .post(baseUrl + '/api/user/register')
              .set('Accept', 'application/json')
              .send({
                email: randomId + "@gmail.com",
                password: randomId,
                confirmPassword: randomId,
                admin: true
              })
              .end(function (err, res) {
                res.should.have.status(401);
                res.should.be.json;
                JSON.parse(res.text).err.should.equal('Admin already exists');
                done();
              });
          });
      });
    });

    describe('auth', function () {
      var currentUser = null, email = null, password = null;

      before (function (done) {
        var randomId = utils.uuid();
        email = randomId + "@gmail.com";
        password = randomId;
        request
          .post(baseUrl + '/api/user/register')
          .set('Accept', 'application/json')
          .send({
            email: email,
            password: password,
            confirmPassword: password,
            admin: false
          })
          .end(function (res) {
            User.findOne({'auth.email':res.body.email, 'auth.password':res.body.password}, function (err, user) {
              if (err) {
                done(err);
                return;
              }
              currentUser = user;
              done();
            });
          });
      });

      after (function () {
        User.remove({}).exec();
      });

      it('should auth with valid email and password', function (done) {
        request
          .post(baseUrl + '/api/user/auth')
          .set('Accept', 'application/json')
          .send({'email':email, 'password':password})
          .end(function (res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.id.should.equal(currentUser.id);
            done();
          });
      });

      it('should fail with missing password', function (done) {
        request
          .post(baseUrl + '/api/user/auth')
          .set('Accept', 'application/json')
          .send({'email':email})
          .end(function (res) {
            res.should.have.status(401);
            res.should.be.json;
            res.body.err.should.equal('Missing :email or :password in request body, please provide both');
            done();
          });
      });
    });
  });
});
