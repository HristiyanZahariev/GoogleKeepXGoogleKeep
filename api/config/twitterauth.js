var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require("./../models/user");  
var config = require("./twitterConfig.js");  
var jwt = require('jsonwebtoken');
var cfg = require("./config");
//var init = require('./init');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile)
    var searchQuery = {
      username: profile.displayName
    };

    var updates = {
      username: profile.displayName,
      id: profile.id
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new use
               User.findOne({ where: { 'twitterId' : profile.id }}).then(function(user) {
                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    User.build({ twitterId: profile.id, username: profile.username}).save().then(function(newUser) {
                        return done(null, newUser);
                      });
                }
            });
  }

));

//serialize user into the session
//init();


module.exports = passport;