var cls = require('./class');

module.exports = File = cls.Class.extend({
    init: function(path) {
        this.path = path;
    }
});
