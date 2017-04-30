module.exports.loginWithTwitter = function (req, res) {

var passport = require('passport');
var Strategy = require('strategy');
var User = require('../models')
var TwitterStrategy = require('passport-twitter').Strategy;

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
}, function (token, tokenSecret, profile, cb) {
    console.log('call');
    process.nextTick(function () {
        console.log(profile);
    });
}));
}