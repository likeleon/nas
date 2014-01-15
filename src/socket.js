var socketio = require('socket.io');
var Directory = require('./models/directory');
var path = require('path');
var _ = require('./lib/underscore-min.js');
var nconf = require('nconf');

module.exports.listen = function(server) {
    var baseDir = nconf.get('basedir');
    var io = socketio.listen(server);

    var getDirInfo = function(dirPath) {
        var dir = new Directory(dirPath);
        var files = _.map(dir.files(), function(file) {
            return { "name": file.name, "size": file.size, "modifiedTime": file.modifiedTime }
        });

        return {
            path: path.relative(baseDir, dirPath),
            files: files
        };
    };

    io.sockets.on('connection', function(socket) {
        socket.emit('dirInfo', getDirInfo(baseDir));

        socket.on('change directory', function(dir, callback) {
            var newDir = path.join(baseDir, dir);
            callback(getDirInfo(newDir));
        });
    });

    return io;
};