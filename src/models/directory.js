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
            var fileNames = fs.readdirSync(this.path);
            this._files = _.map(fileNames, function(fileName) {
                var filePath = path.join(this.dirPath, fileName);
                return new File(filePath);
            }, { dirPath: this.path });
        }
        return this._files;
    }
});

