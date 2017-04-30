var models  = require('./../models');
var express = require('express');
var router  = express.Router();
var Project = require('../models/project');
var Note = require('../models/note');
var User = require('../models/user')
var auth = require('./../config/auth')();


router.post('/create', auth.authenticate(), function(req, res) {  
  	Project.create({
    name: req.body.name,
    color: req.body.color,
    color_dark: req.body.color_dark,
    description: req.body.description
 	}).then(function(project) {
  		project.getUsers().then(function(users) {
  			User.findById(req.user.id).then(function(user) {
  				users.push(user)
  				project.setUsers(users);
  			});
  			res.json("success")
  		});
  	});
});

router.post('/:project_id/user', auth.authenticate(), function(req, res) {
  Project.findById(
    req.params.project_id, 
    {include: [{model: User, as: "users"}]})
  .then(function(project){
    project.getUsers().then(function(users) {
     User.findOne({ where: {username: req.body.username} }).then(function(user) {
        users.push(user);
        project.setUsers(users);
      });
 	});
  });
});

//adding note to a project by creating it with json on the body

router.post('/:project_id/note', auth.authenticate(), function(req, res) {
  Project.findById(
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
    // res.json(project);
  });
});

//Adding note to a project with param note id

router.post('/:project_id/notes/:note_id', auth.authenticate(), function(req, res) {
  Project.findById(
    req.params.project_id, 
    {include: [{model: Note, as: "notes"}]})
  .then(function(project){
    project.getNotes().then(function(notes){
    
      Note.findById(req.params.note_id).then(function(note){
        notes.push(note);
        project.setNotes(notes);
      });

    });

    res.json("success");
  });
});

router.get("/", auth.authenticate(), function(req, res) {  
  console.log(req.user.id)
    User.findOne(
        {
          include: [{model: Project, as: "projects"}],
          where: {
            id: req.user.id
          }
        }
      ).then(function(user){
      res.json(user.projects);
    })
});

router.post('/:project_id/users/:user_id',auth.authenticate(), function(req, res) {
  Project.findById(
    req.params.project_id,
    {include: [{model: User, as: "users"}, {model: Note, as: "notes"}]})
  .then(function(project){
    project.getUsers().then(function(users){
    
      User.findById(req.params.user_id).then(function(user){
        users.push(user);
        project.setUsers(users);
      });

    });

    res.reminder('projects/' + req.params.project_id);
  });
});

router.get('/:project_id', function(req, res){
  Project.findById(
    req.params.project_id, 
    {include: [{model: Note, as: "notes"},{model: User, as: "users"}]})
  .then(function(project){
    res.json(project);
  });
});

router.get('/:project_id/notes', function(req, res){
  Project.findById(
    req.params.project_id, 
    {include: [{model: Note, as: "notes"},{model: User, as: "users"}]})
  .then(function(project){
    res.json(project.notes);
  });
});

module.exports = router;