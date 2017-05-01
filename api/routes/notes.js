var models  = require('./../models');
var express = require('express');
var router  = express.Router();
var Note = require('../models/note');
var User = require('../models/user');
var auth = require('./../config/auth')();
var CronJob = require('cron').CronJob;

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
        res.json("success")
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
      res.json(note);
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

router.post('/:note_id/users', auth.authenticate(), function(req, res) {
  Note.findById(
    req.params.note_id, 
    {include: [{model: User, as: "users"}]})
  .then(function(notes){
    notes.getUsers().then(function(users) {
     User.findOne({ where: {username: req.body.username} }).then(function(user) {
        users.push(user);
        notes.setUsers(users);
      });
  });
  res.json("success")
  });
});

router.get('/:note_id', function(req, res){
  Note.findById(
    req.params.note_id,
    {include: [{model: User, as: "users"}]})
  .then(function(note){
    res.json(note);
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


//worst route eu but its fucked up
router.get('/all/archived', auth.authenticate(), function(req, res) { 
    User.findOne(
        {
          include: [{model: Note, as: "notes"}],
          where: {
            id: req.user.id
          }
        }
      ).then(function(user) {
        user.getNotes().then(function(notes) {
          var archivedNotes = []
          notes.forEach(function(note) {
            console.log(note.archived)
            if (note.archived == true) {
              archivedNotes.push(note)
            }
            res.json(archivedNotes)
          })
        });
      })   
});

router.delete('/:note_id', function(req, res) {
  Note.destroy({ where: { id: req.params.note_id }}).then(function(note) {
    res.json("deleted");
  });
})

router.get("/", auth.authenticate(), function(req, res) {  
  console.log(req.user.id)
    User.findOne(
        {
          include: [{model: Note, as: "notes"}],
          where: {
            id: req.user.id
          }
        }
      ).then(function(user){
      res.json(user.notes);
    })
});

var job = new CronJob('0,30 * * * * *', function() {
    console.log("sup")
  }, function () {
    /* This function is executed when the job stops */
  },
  true
);

module.exports = router;