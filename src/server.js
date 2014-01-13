"use strict";

/**
 * Module dependencies
 */

var express = require('express');
var http = require('http');
var path = require('path');
var _ = require('./lib/underscore-min.js');

var app = express();

/**
 * Server configuration
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
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
app.use(require('./routes/pages').middleware);

var server = exports.server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// socket.io
require('./socket').listen(server);