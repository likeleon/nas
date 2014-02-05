"use strict";

var express = require('express');
var router = new express.Router();
var middleware = require('../middleware');

router.get('/', middleware.locals, function (req, res) {
  return res.render('index', {
    title: 'nas',
    env: res.locals.nas
  });
});

module.exports = router;