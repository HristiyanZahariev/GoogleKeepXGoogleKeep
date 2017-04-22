"use strict";

var sequelize = require("./index.js");
var Note = require("./note");
var Project = require("./project");

var Sequelize = require("sequelize");

var User = sequelize.define('users', {
  id: {
   type: Sequelize.INTEGER(),
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
}
<<<<<<< HEAD
=======
,{
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
}


>>>>>>> 59f55f21102771b8be7e9b7c0d1c88a7738454c9

);

User.belongsToMany(Note, {through: 'user_notes'});
Note.belongsToMany(User, {through: 'user_notes'});

User.belongsToMany(Project, {through: 'user_projects'});
Project.belongsToMany(User, {through: 'user_projects'});



module.exports = User;
