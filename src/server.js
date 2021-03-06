"use strict";

/**
 * Module dependencies
 */

var express = require('express');
var http = require('http');
var path = require('path');
var _ = require('./lib/underscore-min.js');
var nconf = require('nconf');
var middleware = require('./middleware');

/**
 * Setup configurations
 */
require('./utils').setupConfig();

/**
 * MongoDB configuration
 */
var mongoose = require('mongoose');
var node_db_uri = (!module.parent)? nconf.get('node_db_uri') : 'mongodb://localhost/unit-test';
mongoose.connect(node_db_uri, { auto_reconnect:true }, function (err) {
  if (err) {
    throw err;
  }
  console.info('Connected with Mongoose');
});

/**
 * Server configuration
 */
var app = express();

app.use(express.logger('dev'));
app.set('port', nconf.get('port'));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(middleware.cors);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, '/../public') }));
app.use(express.static(path.join(__dirname, '/../public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Custom directives
app.use(require('./routes/auth').middleware);
app.use(require('./routes/pages').middleware);
app.use(require('./routes/download').middleware);

var server = exports.server = http.createServer(app);


/**
 * Start server
 */
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

// start socket.io server
require('./socket').listen(server);