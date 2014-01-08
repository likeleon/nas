var request = require('supertest')
  , app = require('../../src/server');

describe('mvc', function() {
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