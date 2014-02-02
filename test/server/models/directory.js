var Directory = require('../../../src/models/directory')
  , path = require('path');

describe('Directory', function () {
    var dir;
    var dirPath = __dirname + '/../fixtures';

    beforeEach(function () {
        dir = new Directory(dirPath);
    });

    describe('.name', function () {
        it('should expose its name', function () {
            dir.name.should.equal('fixtures');
        })
    });

    describe('.path', function () {
        it('should expose its path', function () {
            dir.path.should.equal(path.normalize(dirPath));
        })
    });

    describe('.dirs()', function () {
        it('should return directories under directory', function () {
            var expectedDirs = [ new Directory(path.join(dirPath, 'foo')) ];
            dir.dirs().should.eql(expectedDirs);
        })
    });

    describe('.files()', function () {
       it('should return files under directory', function () {
            var expectedFiles = [ new File(path.join(dirPath, 'amazing.txt')) ];
            dir.files().should.eql(expectedFiles);
       })
    });

    describe('.modifiedTime', function () {
        it('should expose modified time', function () {
            dir.should.have.property('modifiedTime');
            dir.modifiedTime.should.be.an.instanceof(Date);
        })
    });
});

