var request = require('superagent');
var utils = require('../../../src/utils.js');
var User = require('../../../src/models/user').model;

var nconf = require('nconf');
nconf.set('admin_email', 'me@test.com');
nconf.set('admin_password', '1234');

var app = require('../../../src/server');
var baseUrl = 'http://localhost:' + app.server.address().port;

describe('routes/pages', function () {

  describe('Without at least one administrator', function () {
    describe('GET /', function () {
      it ('should redirect to /create-admin', function (done) {
        request
          .get(baseUrl + '/')
          .end(function (err, res) {
            res.redirects.should.be.eql([baseUrl + '/create-admin']);
            done();
          })
      })
    });
  });

  describe('With admin registered', function () {
    before(function (done) {
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
          err ? done(err) : done();
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

      before(function () {
        admin
          .post(baseUrl + '/api/user/auth')
          .send({
            email: nconf.get('admin_email'),
            password: nconf.get('admin_password')
          })
          .end()
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