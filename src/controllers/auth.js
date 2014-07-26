'use strict';

var api = module.exports;

api.registerAdmin = function (req, res, next) {
};

api.login = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  req.session.userId = email + password;
  res.json();
};