var io = require('socket.io-client');
var File = require('../../src/models/file');
var http = require('http');
var server = require('../../src/server').server;

describe('socket.io', function() {
    var sockOpt = {
        'transports': ['websockets'],
        'force new connection': true
    };

    describe('connect()', function() {
       it('should return files', function (done) {
           var client = io.connect('http://localhost:' + server.address().port, sockOpt);

           client.once('files', function (files) {
               files.should.have.length(1);
               files[0].name.should.be.equal("amazing.txt");

               client.disconnect();
               done();
           });
       });
   });
});

