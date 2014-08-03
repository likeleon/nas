'use strict';

var express = require('express');
var router = new express.Router();
var middleware = require('../middleware');
var User = require('../models/user').model;

router.get('/', middleware.locals, function (req, res) {
  User.count({'auth.admin': true}, function (err, count) {
    if (err) {
      res.json(500, {err:err});
    }

    if (count <= 0) {
      return res.redirect('/static/create-admin');
    }

    if (!req.headers['x-api-user'] && (!req.session || !req.session.userId)) {
      return res.redirect('/static/front');
    }

    return res.render('index', {
      title: 'nas',
      env: res.locals.nas
    });
  });
});

router.get('/static/create-admin', middleware.locals, function (req, res) {
  return res.render('static/create-admin', {
    title: 'nas',
    env: res.locals.nas
  });
});

router.get('/static/front', middleware.locals, function (req, res) {
  return res.render('static/front', {
    title: 'nas',
    env: res.locals.nas
  });
});

module.exports = router;