var request = require('supertest')
  , app = require('../../app');

describe('mvc', function() {
    describe('GET /', function() {
        it('should display a list of files', function(done) {
            request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.text.should.include('<h1>nas</h1>');
                res.text.should.include('<li>amazing.txt</li>');
                done();
            })
        })
    });
});