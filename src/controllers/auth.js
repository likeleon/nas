'use strict';

var api = module.exports;
var validator = require('validator');
var async = require('async');
var User = require('../models/user').model;
var utils = require('../utils');

api.registerUser = function (req, res, next) {
  var email = req.body.email, password = req.body.password, confirmPassword = req.body.confirmPassword;
  if (!(email && password)) {
    return res.json(401, {err: ":email, :password, :confirmPassword required"});
  }
  if (password !== confirmPassword) {
    return res.json(401, {err: ":password and :confirmPassword mismatch"});
  }

  if (!validator.isEmail(email)) {
    return res.json(401, {err: "Email is not valid"});
  }

  async.waterfall([
    function (cb) {
      User.findOne({'auth.email': email}, cb);
    },
    function (found, cb) {
      if (found) {
        return cb("Email already taken");
      }

      var salt = utils.makeSalt();
      var newUser = {
        auth: {
          email: email,
          salt: salt,
          hashed_password: utils.encryptPassword(password, salt),
          admin: false,
          timestamps: {
            created: +new Date(),
            loggedIn: +new Date()
          }
        }
      };
      var user = new User(newUser);
      user.save(cb);
    }
  ], function (err, saved) {
    if (err) {
      return res.json(401, {err: err});
    }
    res.json(200, saved);
  });
};

api.login = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  req.session.userId = email + password;
  res.json();
};