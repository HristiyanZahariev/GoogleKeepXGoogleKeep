var models  = require('./../models');
var express = require('express');
var router  = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt-nodejs');
var session      = require('express-session');
var methodOverride = require('method-override');
var users = require('../models/user')
var auth = require('./../config/auth')();
var jwt = require('jsonwebtoken');
var cfg = require("../config/config");
var bcrypt = require('bcrypt-nodejs');
var Note = require('../models/note')

router.post('/create', function(req, res) {
  hashedPass = bcrypt.hashSync(req.body.password)
  users.create({
    username: req.body.username,
    password: hashedPass,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/', function(req, res){
  users.findAll({include: [{model: Note, as: "notes"}]}).then(function(user){
    res.send(user);
  });
});

router.post("/login", function(req, res) {
  hashedPass = bcrypt.hashSync(req.body.password)
  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }
  // usually this would be a database call:
  users.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    console.log(user)
    if( ! user ){
      res.status(401).json({message:"no such user found"});
    }
    console.log(user.password)
    console.log(hashedPass)

    bcrypt.compare(req.body.password, user.password, function(err, response) { 
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      console.log(user.id)
      var payload = {id: user.id};
      var token = jwt.sign(payload, cfg.jwtSecret);
      res.json({message: "ok", token: token});
    });
  });
})

//Basic request header for authentication: Authorization: JWT JSON_WEB_TOKEN_STRING.....
router.get("/currentuser", auth.authenticate(), function(req, res) {  
    res.json(req.user)
});

// router.post('/login', passport.authenticate('local'),auth.login);

// router.post('/:user_id/tasks/create', function (req, res) {
//   models.Task.create({
//     title: req.body.title,
//     UserId: req.params.user_id
//   }).then(function() {
//     res.redirect('/');
//   });
// });

// router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
//   models.Task.destroy({
//     where: {
//       id: req.params.task_id
//     }
//   }).then(function() {
//     res.redirect('/');
//   });
// });


module.exports = router;