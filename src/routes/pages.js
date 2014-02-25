'use strict';

var express = require('express');
var router = new express.Router();
var middleware = require('../middleware');

router.get('/', middleware.locals, function (req, res) {
//  if (!req.session || !req.session.userId)
//    return res.redirect('/static/front');

  return res.render('index', {
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