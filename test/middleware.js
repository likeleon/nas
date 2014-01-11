var middleware = require('../src/middleware');
var assert = require('assert');

describe('middleware', function() {
    describe('.locals', function() {
        var res;

        beforeEach(function() {
            res = { locals: {} };
            middleware.locals.apply(undefined, [null, res, function() {}]);
        });

        it('should exist', function() {
            middleware.should.have.property('locals');
        });

        it('should add nas property to res.locals', function() {
            res.locals.should.have.property('nas');
            res.locals.nas.should.be.type('object');
        });

        describe('.getManifestFiles(page)', function() {
            it('should include script and css files', function() {
                var nas = res.locals.nas;
                nas.should.have.property('getManifestFiles');
                nas.getManifestFiles.should.be.type('function');

                var files = nas.getManifestFiles("app");
                files.should.include('<link rel="stylesheet" type="text/css" href="/css/style.css">');

                files.should.include('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>');
                files.should.include('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.min.js"></script>');

                files.should.include('<script type="text/javascript" src="/socket.io/socket.io.js"></script>');

                files.should.include('<script type="text/javascript" src="/js/app.js"></script>');
                files.should.include('<script type="text/javascript" src="/js/services/');
                files.should.include('<script type="text/javascript" src="/js/controllers/');
            });

            describe('with a non-existing page', function() {
                it('should throw', function() {
                    assert.throws(function() {
                        res.locals.nas.getManifestFiles("non-existing page");
                    })
                })
            });
        })
    });
});

