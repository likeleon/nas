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
  });
});
