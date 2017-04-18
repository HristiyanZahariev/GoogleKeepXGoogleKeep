"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
// var Note 	  = require("./note")
// var User 	  = require("./user")



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

//Note.hasMany(User, {through: 'users_notes'});
//User.hasMany(Note, {through: 'users_notes'});

// var db = {};
// fs
// 	.readdirSync(__dirname)
// 	.filter(function(file) {
// 		return (file.indexOf(".") !== 0) && (file !== "index.js");
// 	})
// 	.forEach(function(file) {
// 		var model = sequelize.import(path.join(__dirname, file));
// 		db[model.name] = model;
// 	});

// Object.keys(db).forEach(function(modelName) {
// 	if("associate" in db[modelName]){
// 		db[modelName].associate(db);
// 	}
// });


// db.sequelize = sequelize;
// db.Sequelize = Sequelize;


// module.exports = db;
module.exports = sequelize; 