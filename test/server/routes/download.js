var request = require('supertest');
var app = require('../../../src/server');

describe('routes/download', function () {
    describe('GET /download/fixtures/amazing.txt', function () {
        it('should have a download header', function (done) {
            request(app.server)
            .get('/download/fixtures/amazing.txt')
            .end(function (err, res) {
                res.should.have.status(200);
                res.headers.should.have.property('content-disposition', 'attachment; filename="amazing.txt"');
                done();
            })
        })
    });

    describe('GET /download/missing.txt', function () {
        it('should respond with 404', function (done) {
            request(app.server)
            .get('/download/missing.txt')
            .expect(404, done);
        })
    });
});