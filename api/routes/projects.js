var models  = require('./../models');
var express = require('express');
var router  = express.Router();
var project = require('../models/project');
var Note = require('../models/note');
var User = require('../models/user')


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


router.post('/:project_id/addNote', function(req, res){
  project.findById(
    req.params.project_id, 
    {include: [{model: Note, as: "notes"}]})
  .then(function(project){
    project.getNotes();
    var note = Note.create({
      title: req.body.title,
      createdAt: req.body.createdAt,
      reminder: req.body.reminder,
      content: req.body.content,
      contentType: req.body.contentType,
      projectId: req.body.projectId
    }).then(function() {
      res.redirect('/projects/' + req.params.project_id);
    });
    // res.send(project);
  });
});

router.post('/:project_id/addUser/:user_id', function(req, res){
  project.findById(
    req.params.project_id,
    {include: [{model: User, as: "users"}]})
  .then(function(project){
    var users = project.getUsers();
    res.send(users);
  });
});

router.get('/:project_id', function(req, res){
  project.findById(
    req.params.project_id, 
    {include: [{model: Note, as: "notes"}]})
  .then(function(project){
    res.send(project);
  });
});

module.exports = router;