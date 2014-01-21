var socketio = require('socket.io');
var Directory = require('./models/directory');
var path = require('path');
var _ = require('./lib/underscore-min.js');
var nconf = require('nconf');

module.exports.listen = function(server) {
    var baseDir = nconf.get('basedir');
    var io = socketio.listen(server);

    var getFiles = function(dirPath) {
        var directory = new Directory(dirPath);

        var dirs = _.map(directory.dirs(), function(dir) {
            return {
                "type": "directory",
                "name": dir.name,
                "modifiedTime": dir.modifiedTime
            }
        });

        var files = _.map(directory.files(), function(file) {
            return {
                "type": "file",
                "name": file.name,
                "size": file.size,
                "modifiedTime": file.modifiedTime
            }
        });

        return {
            path: path.relative(baseDir, dirPath).replace('\\', '/'),
            dirs: dirs,
            files: files
        };
    };

    io.sockets.on('connection', function(socket) {
        socket.emit('files', getFiles(baseDir));

        socket.on('change directory', function(dir, callback) {
            var newDir = path.join(baseDir, dir);
            callback(getFiles(newDir));
        });
    });

    return io;
};