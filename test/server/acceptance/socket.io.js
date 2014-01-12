var io = require('socket.io-client')
  , File = require('../../../src/models/file')
  , app = require('../../../src/server')
  , http = require('http');

describe('socket.io', function() {
    var server = null;
    var client = null;

    beforeEach(function(done) {
        server = app.server;

        client = io.connect('http://localhost:' + server.address().port, {
            'transports': ['websockets'],
            'force new connection': true
        });

        done();
    });

    describe('connect()', function() {
       it('should return files', function (done) {
           client.once('files', function (files) {
               files.should.have.length(1);
               files[0].name.should.be.equal("amazing.txt");

               client.disconnect();
               done();
           });
       });
   });
});

