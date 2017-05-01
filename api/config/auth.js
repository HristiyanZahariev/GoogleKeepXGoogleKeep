// var user = require('../models/user');

// exports.login = function(req, res) {
//     var user = req.user;
//     req.login(user, function(err) {
//         //if error: do something
//         return res.status(200).json("Hello, " + user.username)
//     });
// };

var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var users = require("./../models/user");  
var cfg = require("./config.js");  
var config = require("./twitterConfig.js")
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {  
    var strategy = new Strategy(params, function(payload, done) {
        users.findById(payload.id).then(function(user) {
            if (user) {
                return done(null, {
                    id: user.id
                });
            } else {
                return done(new Error("User not found"), null);
            }
        });
    });
    passport.use(strategy);
    return {
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};