var cls = require('./class')
  , fs = require('fs')
  , path = require('path')
  , File = require('./file');

module.exports = Directory = cls.Class.extend({
    init: function(path_) {
        this.path = path.normalize(path_);

        this.files = [];
        var fileNames = fs.readdirSync(this.getPath());
        for (var i = 0; i < fileNames.length; ++i) {
            var filePath = path.join(this.getPath(), fileNames[i]);
            this.files.push(new File(filePath));
        }
    },

    getPath: function() {
        return this.path;
    },

    getFiles: function() {
        return this.files;
    }
});

