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
    contentType: req.body.contentType,
    projectId: req.body.projectId
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/', function(req, res){
	note.findAll().then(function(users){
		res.send(users);
	});
});

module.exports = router;