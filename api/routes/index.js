var models = require('../models/user.js');
var express = require('express');
var router = express.Router();
var passportTwitter = require('../config/twitter.js');
var users = require('../models/user')
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var cfg = require("../config/config");

var Sequelize = require("sequelize");

var sequelize = new Sequelize('heroku_2ddbb6dcb252ea7', 'b8113da7ef3f58', '2f4cd18b', {
  host: 'us-cdbr-iron-east-03.cleardb.net',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false
  }

});

router.post('/register', function(req, res) {
  hashedPass = bcrypt.hashSync(req.body.password)
  users.create({
    username: req.body.username,
    password: hashedPass,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).then(function(user) {
    res.json("success")
  }).catch(Sequelize.ValidationError, function (err) {
      // respond with validation errors
      if (err.message == "Validation error: [object SequelizeInstance:users]") {
        return res.status(401).json("Username must be unique")
      }
      return res.status(401).json(err.message);
      }).catch(function (err) {
          // every other error
          return res.status(400).json({
              message: err.message
          });
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
      var payload = {id: user.twitterId};
      var token = jwt.sign(payload, cfg.jwtSecret);
      res.json({message: "ok", token: token});
    });
  });
})

// router.get('/', function(req, res) {
// 	User.findAll().then(function(users){
// 		res.json(users);
// 	});
// });

router.get('/', function(req, res, next) {
  res.json("hello")
});


var passport = require('../config/twitterauth.js');
router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
      var payload = {id: req.user.twitterId};
      var token = jwt.sign(payload, cfg.jwtSecret);
      res.json({message: "ok", token: token});
      console.log(req.user)
    // Successful authentication, redirect home.
    //res.redirect('/');
  });

module.exports = router;