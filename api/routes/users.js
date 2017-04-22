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
var auth = require('./../config/auth')();
var jwt = require("jwt-simple");
var cfg = require("../config/config");  

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

router.post("/login", function(req, res) {  
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
        var userx = user.findOne({
          where: {
            username: req.body.username
          }
        }).then(function(userx){
        
        if(userx) {
            var payload = {
                id: userx.id
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }});
    } else {
        res.sendStatus(401);
    }
});

//Basic request header for authentication: Authorization: JWT JSON_WEB_TOKEN_STRING.....
router.get("/user", auth.authenticate(), function(req, res) {  
    res.json("kur za lozkata")
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