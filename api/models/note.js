"use strict";

var sequelize = require("./index.js");
var Sequelize = require("sequelize");

var Note = sequelize.define("notes", {
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
   		type: Sequelize.STRING(),
   		field: 'content_type'
   	}
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  },{
    classMethods: {
        associate: function(models) {
            Note.hasMany(models.User, {through: 'user_notes'});
        }
    }
 });

module.exports = Note;