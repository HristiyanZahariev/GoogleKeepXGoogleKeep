var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require("./../models/user");  
var config = require("./twitterConfig.js");  
//var init = require('./init');

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

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

    // update the user if s/he exists or add a new user
    User.find({ where: { username: profile.displayName } })
    .on('success', function (user) {
    // Check if record exists in db
    if (user) {
      user.updateAttributes({
        username: 'a very different title now'
      })
      .success(function () {})
    }
  })
  }

));

//serialize user into the session
//init();


module.exports = passport;