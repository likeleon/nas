var cls = require('./../lib/class')
  , fs = require('fs')
  , path = require('path')
  , File = require('./file')
  , _ = require('./../lib/underscore-min');

module.exports = Directory = cls.Class.extend({
    init: function(path_) {
        this.path = path.normalize(path_);
    },

    files: function() {
        if (typeof this._files === 'undefined') {
            var files = [];
            var dirPath = this.path;

            var fileNames = fs.readdirSync(this.path);
            fileNames.forEach(function(fileName) {
                var filePath = path.join(dirPath, fileName);

                if (fs.statSync(filePath).isDirectory())
                    return;

                var file = new File(filePath);
                files.push(file);
            });

            this._files = files;
        }
        return this._files;
    }
});

