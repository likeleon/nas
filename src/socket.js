'use strict';

var socketio = require('socket.io');
var Directory = require('./models/directory');
var path = require('path');
var _ = require('./lib/underscore-min.js');
var nconf = require('nconf');

module.exports.listen = function (server) {
  var baseDir = nconf.get('basedir');
  var io = socketio.listen(server);

  var emitFiles = function (socket, dirPath) {
    var directory = new Directory(dirPath);

    var dirs = _.map(directory.dirs(), function (dir) {
      return {
        "type": "directory",
        "name": dir.name,
        "modifiedTime": dir.modifiedTime
      }
    });

    var files = _.map(directory.files(), function (file) {
      return {
        "type": "file",
        "name": file.name,
        "size": file.size,
        "modifiedTime": file.modifiedTime
      }
    });


    socket.emit('files', {
      path: path.relative(baseDir, dirPath).replace(/\\/g, '/'),
      dirs: dirs,
      files: files
    });
  };

  io.sockets.on('connection', function (socket) {
    socket.on('list files', function (dirPath) {
      emitFiles(socket, path.join(baseDir, dirPath));
    })
  });

  return io;
};