var Directory = require('../../../src/models/directory')
  , path = require('path');

describe('Directory', function() {
    var dir;
    var dirPath = __dirname + '/../fixtures';

    beforeEach(function() {
        dir = new Directory(dirPath);
    });

    describe('.path', function() {
        it('should expose its path', function() {
            dir.path.should.equal(path.normalize(dirPath));
        })
    });

    describe('.files()', function() {
       it('should return files under directory', function() {
           var files = dir.files();
           var expectedFiles = [ new File(path.join(dirPath, "amazing.txt")) ];
           files.should.eql(expectedFiles);
       })
    });
});

