var io = require('socket.io-client');
var File = require('../../src/models/file');
var http = require('http');
var path = require('path');
var nconf = require('nconf');
var server = require('../../src/socket');
var fs = require('fs');

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

    beforeEach(function() {
        client = io.connect('http://localhost:' + port, sockOpt);
    });

    afterEach(function() {
        if (client)
            client.disconnect();
    });

    describe('connect()', function() {
        it('should return dirInfo', function(done) {
            client.once('files', function(dirInfo) {
                dirInfo.path.should.equal('');

                var dirStat = fs.statSync(path.join(nconf.get('basedir'), 'foo'));
                var expectedDirs = [ {
                    "type": "directory",
                    "name": "foo",
                    "modifiedTime": dirStat.mtime.toISOString()
                } ];
                dirInfo.dirs.should.eql(expectedDirs);

                var fileStat = fs.statSync(path.join(nconf.get('basedir'), "amazing.txt"));
                var expectedFiles = [ {
                    "type": "file",
                    "name": "amazing.txt",
                    "size": 8,
                    "modifiedTime": fileStat.mtime.toISOString()
                } ];
                dirInfo.files.should.eql(expectedFiles);

                done();
            });
        });
    });

    describe('change directory', function() {
        it('should return files with changing directory', function(done) {
            client.emit('change directory', 'foo/bar', function(files) {
                files.path.should.equal('foo/bar');
                files.dirs.should.eql([]);
                files.files[0].name.should.equal('bar.txt');
                done();
            });
        });
    });
});

