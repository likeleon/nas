"use strict";

var File = require('../../src/models/file')
  , utils = require('../../src/utils')
  , assert = require('assert')
  , path = require('path');

describe('File', function() {
    var file;

    beforeEach(function() {
        file = new File(path.join(__dirname, 'file.file'));
    });

    describe('with an relative path', function() {
        it('should throw', function() {
            assert.throws(function() {
                new File('file.file');
            })
        })
    });

    describe('.path', function() {
        it('should expose its absolute path', function() {
            file.should.have.property('path');
            utils.isAbsolute(file.path).should.be.true;
            file.path.should.equal(path.join(__dirname, 'file.file'));
        })
    });

    describe('.name', function() {
       it('should expose its name', function() {
           file.should.have.property('name').and.equal('file.file');
       })
    });
});
