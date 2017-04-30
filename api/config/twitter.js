// var user = require('../models/user');

// exports.login = function(req, res) {
//     var user = req.user;
//     req.login(user, function(err) {
//         //if error: do something
//         return res.status(200).json("Hello, " + user.username)
//     });
// };
  
var users = require("./../models/user");  
var cfg = require("./config.js");  
var config = require("./twitterConfig.js")
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: "https://morning-retreat-85964.herokuapp.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ id: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport