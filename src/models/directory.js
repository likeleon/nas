var cls = require('./../lib/class')
  , fs = require('fs')
  , path = require('path')
  , File = require('./file')
  , _ = require('./../lib/underscore-min');

module.exports = Directory = cls.Class.extend({
    init: function (path_) {
        this.path = path.normalize(path_);
        this.name = path.basename(this.path);
        this.modifiedTime = fs.statSync(this.path).mtime;
    },

    _scan: function () {
        var dirs = [];
        var files = [];
        var dirPath = this.path;

        var nodes = fs.readdirSync(this.path);
        nodes.forEach(function (nodeName) {
            var nodePath = path.join(dirPath, nodeName);

            if (fs.statSync(nodePath).isDirectory())
                dirs.push(new Directory(nodePath));
            else
                files.push(new File(nodePath));
        });

        this._dirs = dirs;
        this._files = files;
    },

    dirs: function () {
        if (typeof this._dirs === 'undefined') {
            this._scan();
        }
        return this._dirs;
    },

    files: function () {
        if (typeof this._files === 'undefined') {
            this._scan();
        }
        return this._files;
    }
});

