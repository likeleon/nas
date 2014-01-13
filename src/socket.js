var socketio = require('socket.io');
var Directory = require('./models/directory');
var path = require('path');
var _ = require('./lib/underscore-min.js');

module.exports.listen = function(server) {
    var baseDir = path.join(__dirname, '../test/server/fixtures');
    var io = socketio.listen(server);

    var emitFiles = function(eventName, socket, dirPath) {
        var dir = new Directory(dirPath);
        var files = _.map(dir.files(), function(file) {
            return { "name": file.name, "size": file.size, "modifiedTime": file.modifiedTime }
        });

        var relativeDir = path.relative(baseDir, dirPath);
        socket.emit(eventName, relativeDir, files);
    };

    io.sockets.on('connection', function(socket) {
        emitFiles('files', socket, baseDir);

        socket.on('change directory', function(dir) {
            var newDir = path.join(baseDir, dir);
            emitFiles('change directory', socket, newDir);
        });
    });

    return io;
}