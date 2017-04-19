var user = require('../models/user');

exports.login = function(req, res) {
    var user = req.user;
    req.login(user, function(err) {
        //if error: do something
        return res.status(200).json("Hello, " + user.username)
    });
};