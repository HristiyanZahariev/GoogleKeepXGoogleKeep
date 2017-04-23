var models  = require('./../models');
var express = require('express');
var router  = express.Router();
var Note = require('../models/note');
var User = require('../models/user');
var auth = require('./../config/auth')();

router.post('/create', auth.authenticate(), function(req, res) {  
  	Note.create({
    title: req.body.title,
    createdAt: req.body.createdAt,
    reminder: req.body.reminder,
    content: req.body.content,
    contentType: req.body.contentType,
    archived: false
    // projectId: req.body.projectId
  }).then(function(note){
    note.getUsers().then(function(users) {
      User.findById(req.user.id).then(function(user){
        users.push(user);
        note.setUsers(users);
        res.redirect("/notes/" + note.id)
      });
  	});
    });
});

//Get 
router.get('/:note_id/users', function(req, res){
  Note.findById(
    req.params.note_id,
    {include: [{model: User, as: "users"}]})
  .then(function(note){
      res.send(note);
  });
});

//Add another user to note
router.post('/:note_id/users/:user_id', function(req, res){
  Note.findById(req.params.note_id)
  .then(function(note){
    note.getUsers().then(function(users){
      User.findById(req.params.user_id).then(function(user){
        users.push(user);
        note.setUsers(users);
      });
    });
    res.redirect('/notes/' + req.params.note_id);
  });
});

router.get('/:note_id', function(req, res){
  Note.findById(
    req.params.note_id,
    {include: [{model: User, as: "users"}]})
  .then(function(note){
    res.send(note);
  });
})

router.get('/archive/:note_id', auth.authenticate(), function(req, res) { 
	Note.findById(req.params.note_id)
	.then(function(note) {
		note.update ({
  			archived: true
		}).then(function() {
			 			res.json("archived");
		})
	});
});

router.get('/', function(req, res){
	Note.findAll().then(function(notes){
		res.send(notes);
	});
});

module.exports = router;