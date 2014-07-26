'use strict';

var auth = require('../controllers/auth');
var express = require('express');
var router = new express.Router();

router.post('/api/user/register', auth.registerUser);
router.post('/api/user/auth', auth.login);

module.exports = router;