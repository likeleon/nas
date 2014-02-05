var cls = require('./../lib/class');
var utils = require('./../utils');
var path = require('path');
var fs = require('fs');

module.exports = File = cls.Class.extend({
  init: function (path_) {
    if (!path_ || !utils.isAbsolute(path_))
      throw new Error('File() requires an absolute path');

    this.path = path_;
    this.name = path.basename(path_);

    var stats = fs.statSync(path_);
    this.size = stats.size;
    this.modifiedTime = stats.mtime;
  }
});
