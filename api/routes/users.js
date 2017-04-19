var models  = require('./../models');
var express = require('express');
var router  = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt-nodejs');
var session      = require('express-session');
var methodOverride = require('method-override');
var user = require('../models/user')
var auth = require('./../config/auth');

router.post('/create', function(req, res) {
  user.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/');
  });
});

router.post("/signup", function(req, res, next){
  user.findOne({
    where: {
     username: req.body.username
    }
  }).then(function(userx){
    if(!userx){
      user.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }).then(function(user){
        passport.authenticate('local', function (err, account) {
          req.logIn(account, function() {
            res.status(err ? 500 : 200).send(err ? err : account);
          });
        })(req, res, next);
      })
    } else {
      res.send("user exists")
    }
  })
})

router.post('/login', passport.authenticate('local'),auth.login);

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