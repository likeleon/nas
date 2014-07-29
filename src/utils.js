'use strict';

var nconf = require('nconf');
var path = require('path');
var crypto = require('crypto');

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

// Encryption using http://dailyjs.com/2010/12/06/node-tutorial-5/
// Note: would use [password-hash](https://github.com/davidwood/node-password-hash), but we need to run
// model.query().equals(), so it's a PITA to work in their verify() function

module.exports.encryptPassword = function(password, salt) {
  return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

module.exports.makeSalt = function() {
  var len = 10;
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').substring(0, len);
};