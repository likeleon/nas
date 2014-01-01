var io = require('socket.io-client')
  , spawn = require('child_process').spawn
  , File = require('../../src/file');

var app = null;
var client = null;

function startTest(appName, done, test_func) {
    app = spawn('node', [appName]);
    setTimeout(function() {
        done();
        test_func();
    }, 500);
}

describe('socket.io', function() {
   describe('connect()', function() {
       it('should return files', function (next) {
           startTest('../../app.js', next, function(done) {
               client = io.connect('http://localhost:3000', {
                   'reconnection delay': 0,
                   'reopen delay': 0,
                   'force new connection': true
               });

               client.on('files', function (files) {
                   files.should.have.length(1);
                   files[0].should.be.an.instanceof(File);
                   files[0].name.should.be.equal("amazing.txt");
                   client.disconnect();
                   done();
               });

               client.on('connection', function() {
                   client.emit('list files');
               });
           })
       });
   });
});

afterEach(function(done) {
    if (client)
        client.disconnect();
    if (app) {
        app.on('exit', function() {
            done();
        });
        app.kill('SIGKILL');
    }
    else {
        done();
    }
});

