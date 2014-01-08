var express = require('express');
var router = new express.Router();

/**
 * App
 */
router.get('/', function(req, res) {
    return res.render('index', {
        title: 'nas'
    });
});

module.exports = router;