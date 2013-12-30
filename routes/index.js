var Directory = require('../src/directory')
  , path = require('path');

exports.index = function(req, res){
    var directory = new Directory(path.join(__dirname, '../'));
    var files = directory.files();

    res.render('index', {
        title: 'nas',
        files: files
    });
};