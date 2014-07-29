var request = require('superagent');
var utils = require('../../../src/utils.js');
var User = require('../../../src/models/user').model;

var app = require('../../../src/server');
var baseUrl = 'http://localhost:' + app.server.address().port;

describe('routes/pages', function () {

  describe('Without at least one administrator', function () {
    describe('GET /', function () {
      it ('should redirect to /static/create-admin', function (done) {
        request
          .get(baseUrl + '/')
          .end(function (err, res) {
            res.redirects.should.be.eql([baseUrl + '/static/create-admin']);
            done();
          })
      })
    });
  });

  describe('With admin registered', function () {
    var adminEmail, adminPassword;

    before(function (done) {
      var randomId = utils.uuid();
      adminEmail = randomId + "@gmail.com";
      adminPassword = randomId;

      request
        .post(baseUrl + '/api/user/register')
        .set('Accept', 'application/json')
        .send({
          email: adminEmail,
          password: adminPassword,
          confirmPassword: adminPassword,
          admin: true
        })
        .end(function (err, res) {
          (err) ? done(err) : done();
        })
    });

    after(function () {
      User.remove({}).exec();
    });

    describe('Without authentication', function () {
      describe('GET /', function () {
        it ('should redirect to /static/front', function (done) {
          request
            .get(baseUrl + '/')
            .end(function (err, res) {
              res.redirects.should.eql([baseUrl + '/static/front']);
              done();
            })
        })
      });
    });

    describe('With authentication', function () {
      var admin = request.agent();

      before(function (done) {
        admin
          .post(baseUrl + '/api/user/auth')
          .send({
            email: adminEmail,
            password: adminPassword
          })
          .end(function (err, res) {
            err ? done(err) : done();
          })
      });

      describe('GET /', function () {
        it('should display files table', function (done) {
          admin
            .get(baseUrl + '/')
            .end(function (err, res) {
              res.should.have.status(200);
              res.text.should.include('<table class="table table-hover filetable">');
              done();
            })
        })
      });
    });
  });
});