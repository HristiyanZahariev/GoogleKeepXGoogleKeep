"use strict";

var sequelize = require("./index.js");
var Sequelize = require("sequelize");
var Note = require("./note");
var User = require("./user")

var Project = sequelize.define('project', {
  id: {
   type: Sequelize.INTEGER(),
   autoIncrement: true,
   primaryKey: true,
   field: 'id'
  },
  name: {
    type: Sequelize.STRING(),
    field: 'name' 
  },
  color: {
    type: Sequelize.INTEGER(),
    field: 'color'
  },
  colorDark: {
   type: Sequelize.STRING(),
   field: 'color_dark'
  }
},{
    classMethods:{
      associate: function(){
        Project.belongsToMany(User, {through: 'user_projects'});
      }
    }
});

Project.hasMany(Note, {as: 'notes'});


module.exports = Project;
