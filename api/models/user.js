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
  deviceToken: {
    type: Sequelize.STRING(),
    field: 'device_token'
  },
  twitterId: {
    type: Sequelize.BIGINT(),
    field: 'twitterId',
    subquery: true 
  },
  username: {
    type: Sequelize.STRING(),
    field: 'username'
   //  validate: {
   //    isUnique: function(value, next) {

   //        User.find({
   //            where: {username: value}
   //        })
   //            .then(function(error, user) {

   //                if (error)
   //                    // Some unexpected error occured with the find method.
   //                    return next(error);

   //                if (user)
   //                    // We found a user with this email address.
   //                    // Pass the error to the next method.
   //                    return next('Username already in use!');

   //                // If we got this far, the email address hasn't been used yet.
   //                // Call next with no arguments when validation is successful.
   //                next();

   //            });

   //    }
   //  },
   // allowNull: false

  },
  password: {
    type: Sequelize.STRING(),
    field: 'password',
    //allowNull: false
  },
  email: {
   type: Sequelize.STRING(),
   field: 'email',
   //allowNull: false

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


);

User.belongsToMany(Note, {through: 'user_notes'});
Note.belongsToMany(User, {through: 'user_notes'});

User.belongsToMany(Project, {through: 'user_projects'});
Project.belongsToMany(User, {through: 'user_projects'});



module.exports = User;
