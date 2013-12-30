var cls = require('./lib/class')
  , utils = require('./utils')
  , path = require('path');

module.exports = File = cls.Class.extend({
    init: function(path_) {
        if (!path_ || !utils.isAbsolute(path_))
            throw new Error('File() requires an absolute path');

        this.path = path_;
        this.name = path.basename(path_);
    }
});
