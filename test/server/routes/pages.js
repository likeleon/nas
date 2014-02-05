var request = require('supertest');
var app = require('../../../src/server');

describe('routes/pages', function () {
  describe('GET /', function () {
    it('should display files table', function (done) {
      request(app.server)
        .get('/')
        .end(function (err, res) {
          res.should.have.status(200);
          res.text.should.include('<table class="table table-hover filetable">');
          done();
        })
    })
  });
});