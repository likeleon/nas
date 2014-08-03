var superagentDefaults = require('superagent-defaults');
var utils = require('../../../src/utils.js');
var User = require('../../../src/models/user').model;

var app = require('../../../src/server');
var baseUrl = 'http://localhost:' + app.server.address().port;

var request = superagentDefaults();

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
      before(function (done) {
        request
          .post(baseUrl + '/api/user/auth')
          .send({
            email: adminEmail,
            password: adminPassword
          })
          .end(function (err, res) {
            if (err) {
              done(err);
              return;
            }
            User.findOne({'_id':res.body.id}, function (err, user) {
              if (err) {
                done(err);
                return;
              }
              request
                .set('Accept', 'application/json')
                .set('x-api-user', user._id);
              done();
            });
          })
      });

      describe('GET /', function () {
        it('should display files table', function (done) {
          request
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