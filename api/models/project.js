"use strict";

var sequelize = require("./index.js");
var Sequelize = require("sequelize");
var Note = require("./note");

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
    type: Sequelize.STRING(),
    field: 'color'
  },
  description: {
   type: Sequelize.STRING(),
   field: 'description'
  },
  type: {
   type: Sequelize.STRING(),
   field: 'type'
  }
});

Project.hasMany(Note, {as: 'notes'});

module.exports = Project;
