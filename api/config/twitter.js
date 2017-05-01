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
var TwitterTokenStrategy = require('passport-twitter-token');

passport.use(new TwitterTokenStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  }, function(token, tokenSecret, profile, done) {
    User.findOrCreate({ id: profile.id }, function (error, user) {
      return done(error, user);
    });
  }
));

module.exports = passport