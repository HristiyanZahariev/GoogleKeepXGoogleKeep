"use strict";

var sequelize = require("./index.js");
var Sequelize = require("sequelize");
var User = require("./user");

// var sequelize = new Sequelize('heroku_2ddbb6dcb252ea7', 'b8113da7ef3f58', '2f4cd18b', {
//   host: 'us-cdbr-iron-east-03.cleardb.net',
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
//   define: {
//     timestamps: false
//   }

// });

var Note = sequelize.define('note', {
  id: {
   type: Sequelize.BIGINT(11),
   autoIncrement: true,
   primaryKey: true,
   field: 'id'
  },
 	title: {
 		type: Sequelize.STRING(),
 		field: 'title'
 	},
 	createdAt: {
 		type: Sequelize.DATE(), //can be DATE()
 		field: 'created_at'
 	},
 	reminder: {
 		type: Sequelize.DATE(),
 		field: 'reminder'
 	},
 	content: {
 		type: Sequelize.STRING(),
 		field: 'content'
 	},
 	contentType: {
 		type: Sequelize.INTEGER(),
 		field: 'content_type'
 	},
 	archived: {
 		type: Sequelize.BOOLEAN(),
 		field: 'archived'
 	},
 	status: {
 		type: Sequelize.ENUM("ToDo", "Doing", "Done"),
 		field: 'status'
 	}
}, {
  freezeTableName: true // Model tableName will be the same as the model namere
});

// Note.belongsToMany(User, {through: 'user_notes'});
// Note.belongsToMany(User, {foreignKey: {name : "user_id", allowNull: false},through: 'user_notes'});


module.exports = Note;
