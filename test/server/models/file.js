"use strict";

var File = require('../../../src/models/file')
  , utils = require('../../../src/utils')
  , assert = require('assert')
  , path = require('path');

describe('File', function () {
    var file;

    beforeEach(function () {
        file = new File(path.join(__dirname, '../fixtures/amazing.txt'));
    });

    describe('with an relative path', function () {
        it('should throw', function () {
            assert.throws(function () {
                new File('../fixtures/amazing.txt');
            })
        })
    });

    describe('.path', function () {
        it('should expose its absolute path', function () {
            file.should.have.property('path');
            utils.isAbsolute(file.path).should.be.true;
            file.path.should.equal(path.join(__dirname, '../fixtures/amazing.txt'));
        })
    });

    describe('.name', function () {
        it('should expose its name', function () {
            file.should.have.property('name').and.equal('amazing.txt');
        })
    });

    describe('.size', function () {
        it('should expose its size in bytes', function () {
            file.should.have.property('size').and.equal(8);
        })
    });

    describe('.modifiedTime', function () {
        it('should expose modified time', function () {
            file.should.have.property('modifiedTime');
            file.modifiedTime.should.be.an.instanceof(Date);
        })
    });
});
