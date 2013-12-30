var File = require('../src/file');

describe('File', function() {
    describe('.path', function() {
        it('should expose its path', function() {
            var filePath = 'file.file';
            var file = new File(filePath);
            file.path.should.equal(filePath);
        })
    });
});
