var models  = require('./../models');
var express = require('express');
var router  = express.Router();
var note = require('../models/note')

router.post('/create', function(req, res) {
  note.create({
    title: req.body.title,
    createdAt: req.body.createdAt,
    reminder: req.body.reminder,
    content: req.body.content,
    contentType: req.body.contentType
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;