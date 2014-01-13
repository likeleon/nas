var socketio = require('socket.io');
var Directory = require('./models/directory');
var path = require('path');
var _ = require('./lib/underscore-min.js');

module.exports.listen = function(server) {
    var io = socketio.listen(server);

    io.sockets.on('connection', function(socket) {
        var dir = new Directory(path.join(__dirname, '../test/server/fixtures'));
        var files = _.map(dir.files(), function(file) {
            return { "name": file.name, "size": file.size, "modifiedTime": file.modifiedTime }
        });
        socket.emit('files', files);
    });

    return io;
}