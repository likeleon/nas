var request = require('supertest');
var app = require('../../src/server');

describe('routes/pages', function() {
    describe('GET /', function() {
        it('should display title', function(done) {
            request(app.server)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.text.should.include('<h1>nas</h1>');
                done();
            })
        })
    });
});