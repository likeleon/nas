var Directory = require('../directory')
  , path = require('path');

describe('Directory', function() {
    var dir;
    var dirPath = __dirname + '/fixtures';

    beforeEach(function() {
        dir = new Directory(dirPath);
    });

    describe('.getPath()', function() {
        it('should return directory path', function() {
            dir.getPath().should.equal(path.normalize(dirPath));
        })
    });

    describe('.getFiles()', function() {
       it('should return files under directory', function() {
           var files = dir.getFiles();
           files.should.have.length(1);
           files[0].should.be.an.instanceof(File);
           files[0].getPath().should.be.equal(path.join(dirPath, "amazing.txt"));
       })
    });
});

