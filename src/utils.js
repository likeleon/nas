'use strict';

var nconf = require('nconf');
var path = require('path');

module.exports.isAbsolute = function (path) {
  if (path[0] === '/')
    return true;
  else
    return path[1] === ':' && path[2] === '\\';
};

module.exports.setupConfig = function () {
  nconf.argv()
    .env()
    .file('user', path.join(path.resolve(__dirname, '../config.json')))
    .defaults({
      'basedir': process.cwd(),
      'port': 3000,
      'admin_email': '',
      'admin_password': '',
      'node_db_uri': 'mongodb://localhost/nas'
    });
};

module.exports.uuid = function ()  {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r, v;
    r = Math.random() * 16 | 0;
    v = (c === "x" ? r : r & 0x3 | 0x8);
    return v.toString(16);
  });
};