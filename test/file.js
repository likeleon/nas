var File = require('../file');

describe('File', function() {
    describe('.getPath()', function() {
        it('should return file path', function() {
            var filePath = 'file.file';
            var file = new File(filePath);
            file.getPath().should.equal(filePath);
        })
    });
});
