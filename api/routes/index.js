var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	models.User.findAll({}, {raw: true}).then(function(users){
		res.send(users);
	});
});

module.exports = router;