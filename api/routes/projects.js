var models  = require('./../models');
var express = require('express');
var router  = express.Router();
var project = require('../models/project')

router.post('/create', function(req, res) {
  project.create({
    name: req.body.name,
    color: req.body.color,
    description: req.body.description,
    type: req.body.type,
    notes: [
    	{title: "hello"}
    ]
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;