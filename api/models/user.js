"use strict";

module.exports = function(sequelize, DataTypes){

  var User = sequelize.define('users', {
    id: {
     type: DataTypes.BIGINT(11),
     autoIncrement: true,
     primaryKey: true,
     field: 'id'
    },
    username: {
      type: DataTypes.STRING(),
      field: 'username' 
    },
    password: {
      type: DataTypes.STRING(),
      field: 'password'
    },
    email: {
     type: DataTypes.STRING(),
     field: 'email'
    },
    firstName: {
     type: DataTypes.STRING(),
     field: 'first_name'
    },
    lastName: {
     type: DataTypes.STRING(),
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

  return User;
};
