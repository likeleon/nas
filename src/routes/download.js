"use strict";

var express = require('express');
var router = new express.Router();
var nconf = require('nconf');
var path = require('path');
var fs = require('fs');

router.get('/download/:file(*)', function(req, res, next) {
    var file = req.params.file;
    var filePath = path.join(nconf.get('basedir'), file);

    fs.exists(filePath, function(exists) {
        if (exists)
            res.download(filePath);
        else
            res.send(404, 'File not found');
    });
});

module.exports = router;
