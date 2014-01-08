var Directory = require('../src/models/directory')
  , path = require('path');

describe('Directory', function() {
    var dir;
    var dirPath = __dirname + '/fixtures';

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
           files.should.have.length(1);
           files[0].should.be.an.instanceof(File);
           files[0].path.should.be.equal(path.join(dirPath, "amazing.txt"));
       })
    });
});

