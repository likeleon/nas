var Directory = require('../src/directory')
  , path = require('path');

exports.index = function(req, res){
    var directory = new Directory(path.join(__dirname, '../test/fixtures'));

    res.render('index', {
        title: 'nas',
        files: directory.files()
    });
};