// BASE SETUP
// =============================================================================

var express = require('express'),
  bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8080;


// IMPORT MODELS
// =============================================================================
var Sequelize = require('sequelize');

// db config
var env = "dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
// var sequelize = new Sequelize(
//   config.database,
//   config.user,
//   config.password,
//   config.host,
//   {
//     dialect: config.driver,
//     logging: console.log,
//     define: {
//       timestamps: false
//     }
//   }
// );

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

var crypto = require('crypto');
var DataTypes = require("sequelize");

var User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      omitNull: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
      User.findAll({}, {raw: true}).then(onSuccess).error(onError);
    },
      retrieveById: function(user_id, onSuccess, onError) {
      User.find({where: {id: user_id}}, {raw: true}).then(onSuccess).error(onError);
    },
      add: function(onSuccess, onError) {
        var username = this.username;
        var password = this.password;
        var email = this.email;
        var first_name = this.first_name;
        var last_name = this.last_name;
        // var password = this.password;

        var shasum = crypto.createHash('sha1');
        shasum.update(password);
        password = shasum.digest('hex');

        User.build({ username: username,
                     password: password,
                     email: email,
                     first_name: first_name,
                     last_name: last_name })
            .save().then(onSuccess).error(onError);
       },
    updateById: function(user_id, onSuccess, onError) {
      var username = this.username;
      var password = this.password;
      var email = this.email;
      var first_name = this.first_name;
      var last_name = this.last_name;

      var shasum = crypto.createHash('sha1');
      shasum.update(password);
      password = shasum.digest('hex');

      User.update({ username: username,password: password, email: email, first_name: first_name, last_name: last_name},{where: {id: id} }).then(onSuccess).error(onError);
     },
      removeById: function(user_id, onSuccess, onError) {
      User.destroy({where: {id: user_id}}).then(onSuccess).error(onError);
    }
    }
  });


// IMPORT ROUTES
// =============================================================================
var router = express.Router();

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

// create a user (accessed at POST http://localhost:8080/api/users)
.post(function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name; //bodyParser does the magic
  // var password = req.body.password;

  var user = User.build({ username: username, password: password, email: email, first_name: first_name, last_name: last_name });// password: password });

  user.add(function(success){
    res.json({ message: 'User created!' });
  },
  function(err) {
    res.send(err);
  });
})

// get all the users (accessed at GET http://localhost:8080/api/users)
.get(function(req, res) {
  var user = User.build();

  user.retrieveAll(function(users) {
    if (users) {
      res.json(users);
    } else {
      res.send(401, "User not found");
    }
    }, function(error) {
    res.send("User not found");
    });
});


// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

// update a user (accessed at PUT http://localhost:8080/api/users/:user_id)
.put(function(req, res) {
  var user = User.build();

  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;

  user.updateById(req.params.user_id, function(success) {
    console.log(success);
    if (success) {
      res.json({ message: 'User updated!' });
    } else {
      res.send(401, "User not found");
    }
    }, function(error) {
    res.send("User not found");
    });
})

// get a user by id(accessed at GET http://localhost:8080/api/users/:user_id)
.get(function(req, res) {
  var user = User.build();

  user.retrieveById(req.params.user_id, function(users) {
    if (users) {
      res.json(users);
    } else {
      res.send(401, "User not found");
    }
    }, function(error) {
    res.send("User not found");
    });
})

// delete a user by id (accessed at DELETE http://localhost:8080/api/users/:user_id)
.delete(function(req, res) {
  var user = User.build();

  user.removeById(req.params.user_id, function(users) {
    if (users) {
      res.json({ message: 'User removed!' });
    } else {
      res.send(401, "User not found");
    }
    }, function(error) {
    res.send("User not found");
    });
});

// Middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);