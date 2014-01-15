var utils = require('../../src/utils');
var nconf = require('nconf');

describe('utils.isAbsolute(path)', function() {
    it('should support windows', function() {
        utils.isAbsolute('c:\\').should.be.true;
        utils.isAbsolute(':\\').should.be.false;
    });

    it('should unices', function() {
        utils.isAbsolute('/foo/bar').should.be.true;
        utils.isAbsolute('foo/bar').should.be.false;
    });
});

describe('utils.setupConfig()', function() {
    it('should provide default configuration values', function() {
        utils.setupConfig();
        nconf.get('port').should.be.equal(3000);
        nconf.get('basedir').should.be.equal(process.cwd());
    });
});