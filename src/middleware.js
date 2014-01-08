"use strict";

var manifestFiles = require("../public/manifest.json");
var _ = require("./lib/underscore-min");

var getManifestFiles = function(page) {
    var files = manifestFiles[page];

    if (!files)
        throw new Error("Page not found");

    var result = '';

    _.each(files.css, function(file) {
        result += '<link rel="stylesheet" type="text/css" href="' + file + '">';
    });

    _.each(files.js, function(file) {
        result += '<script type="text/javascript" src="' + file + '"></script>';
    });

    return result;
};

module.exports.locals = function(req, res, next) {
    res.locals.nas = {
        getManifestFiles: getManifestFiles
    };

    next();
};
