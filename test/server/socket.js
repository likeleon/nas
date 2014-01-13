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
        it('should return files', function (done) {
            client.once('files', function (dir, files) {
                var expectedFiles = [{ name: 'amazing.txt', size: 8, modifiedTime: '2014-01-01T17:17:52.000Z' }];
                dir.should.equal('');
                files.should.eql(expectedFiles);
                done();
            });
        });
    });

    describe('change directory', function() {
        it('should return files with changing directory', function (done) {
            client.once('change directory', function (dir, files) {
                dir.should.equal('foo');
                files.should.eql([]);
                done();
            });

            client.emit('change directory', 'foo');
        });
    });
});

