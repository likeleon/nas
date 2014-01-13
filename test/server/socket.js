var io = require('socket.io-client');
var File = require('../../src/models/file');
var http = require('http');
var server = require('../../src/server').server;

describe('socket', function () {
    var client = null;

    var sockOpt = {
        'transports': ['websockets'],
        'force new connection': true
    };

    beforeEach(function () {
        client = io.connect('http://localhost:' + server.address().port, sockOpt);
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

