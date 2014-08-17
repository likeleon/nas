"use strict";

var manifestFiles = require("../public/manifest.json");
var _ = require("./lib/underscore-min");

module.exports.cors = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,HEAD,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Accept,Content-Encoding,X-Requested-With,x-api-user,x-api-key");
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }
  return next();
};

var getManifestFiles = function (page) {
  var files = manifestFiles[page];

  if (!files)
    throw new Error("Page not found");

  var result = '';

  _.each(files.css, function (file) {
    result += '<link rel="stylesheet" type="text/css" href="' + file + '">';
  });

  _.each(files.js, function (file) {
    result += '<script type="text/javascript" src="' + file + '"></script>';
  });

  return result;
};

module.exports.locals = function (req, res, next) {
  res.locals.nas = {
    getManifestFiles: getManifestFiles
  };

  next();
};
