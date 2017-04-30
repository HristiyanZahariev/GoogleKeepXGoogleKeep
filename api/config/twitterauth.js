var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require("./../models/user");  
var config = require("./twitterConfig.js");  
//var init = require('./init');

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  }, function(token, tokenSecret, profile, done) {
    User.findOrCreate({ twitterId: profile.id }, function (error, user) {
      return done(error, user);
    });
  }
));

//serialize user into the session
//init();


module.exports = passport;