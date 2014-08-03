'use strict';

var api = module.exports;
var validator = require('validator');
var async = require('async');
var User = require('../models/user').model;
var utils = require('../utils');

api.registerUser = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var admin = req.body.admin;

  if (!email || !password || admin === undefined) {
    return res.json(401, {err: ":email, :password, :confirmPassword, :admin required"});
  }
  if (password !== confirmPassword) {
    return res.json(401, {err: ":password and :confirmPassword mismatch"});
  }

  if (!validator.isEmail(email)) {
    return res.json(401, {err: "Email is not valid"});
  }

  async.waterfall([
    function (cb) {
      if (admin) {
        User.findOne({'auth.admin': true}, cb);
      } else {
        cb (null, null);
      }
    },
    function (found, cb) {
      if (found) {
        return cb('Admin already exists');
      }

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
          admin: admin,
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
  if (!email || !password) {
    return res.json(401, {err: 'Missing :email or :password in request body, please provide both'});
  }
  User.findOne({'auth.email': email}, function (err, user) {
    if (err) {
      return res.json(500, {err:err});
    }
    if (!user) {
      return res.json(401, {err:"email '" + email + "' not found."});
    }
    User.findOne({
      'auth.email': email,
      'auth.hashed_password': utils.encryptPassword(password, user.auth.salt)
    }, function (err, user) {
      if (err) {
        return res.json(500, {err:err});
      }
      if (!user) {
        return res.json(401, {err:'Incorrect password'});
      }
      res.json({id: user._id});
    });
  });
};