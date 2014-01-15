var io = require('socket.io-client');
var File = require('../../src/models/file');
var http = require('http');
var path = require('path');
var nconf = require('nconf');
var server = require('../../src/socket');

describe('socket', function () {
    var client = null;
    var oldBasedir;
    var port = 40000;

    var sockOpt = {
        'transports': ['websockets'],
        'force new connection': true
    };

    before(function() {
        oldBasedir = nconf.get('basedir');
        nconf.set('basedir', path.join(__dirname, './fixtures'));
        server.listen(port);
    });

    after(function() {
        nconf.set('basedir', oldBasedir);
    });

    beforeEach(function () {
        client = io.connect('http://localhost:' + port, sockOpt);
    });

    afterEach(function () {
        if (client)
            client.disconnect();
    });

    describe('connect()', function() {
        it('should return dirInfo', function (done) {
            client.once('dirInfo', function (dirInfo) {
                dirInfo.path.should.equal('');
                var expectedFiles = [{ name: 'amazing.txt', size: 8, modifiedTime: '2014-01-01T17:17:52.000Z' }];
                dirInfo.files.should.eql(expectedFiles);
                done();
            });
        });
    });

    describe('change directory', function() {
        it('should return files with changing directory', function (done) {
            client.emit('change directory', 'foo', function (dirInfo) {
                dirInfo.path.should.equal('foo');
                dirInfo.files.should.eql([]);
                done();
            });
        });
    });
});

