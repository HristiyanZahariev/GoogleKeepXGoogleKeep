"use strict";

module.exports = function(sequelize, DataTypes) {
	
	var Note = sequelize.define("notes", {
		id: {
	     type: DataTypes.BIGINT(11),
	     autoIncrement: true,
	     primaryKey: true,
	     field: 'id'
	    },
	   	title: {
	   		type: DataTypes.STRING(),
	   		field: 'title'
	   	},
	   	createdAt: {
	   		type: DataTypes.DATE(), //can be DATE()
	   		field: 'created_at'
	   	},
	   	reminder: {
	   		type: DataTypes.DATE(),
	   		field: 'reminder'
	   	},
	   	content: {
	   		type: DataTypes.STRING(),
	   		field: 'content'
	   	},
	   	contentType: {
	   		type: DataTypes.STRING(),
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

	return Note;
}