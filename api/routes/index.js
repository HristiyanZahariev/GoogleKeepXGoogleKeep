var models = require('../models/user.js');
var express = require('express');
var router = express.Router();
var passportTwitter = require('../config/twitter.js');

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

var User = sequelize.define('users', {
    id: {
     type: Sequelize.BIGINT(11),
     autoIncrement: true,
     primaryKey: true,
     field: 'id'
    },
    username: {
      type: Sequelize.STRING(),
      field: 'username' 
    },
    password: {
      type: Sequelize.STRING(),
      field: 'password'
    },
    email: {
     type: Sequelize.STRING(),
     field: 'email'
    },
    firstName: {
     type: Sequelize.STRING(),
     field: 'first_name'
    },
    lastName: {
     type: Sequelize.STRING(),
     field: 'last_name'
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  },{
    classMethods: {
        associate: function(models) {
            User.hasMany(models.Notes, {through: 'user_notes'});
        }
    },
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
         User.findAll().then(onSuccess).error(onError);
      }
   }



  });

router.get('/', function(req, res) {
	User.findAll().then(function(users){
		res.send(users);
	});
});

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter'),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

module.exports = router;