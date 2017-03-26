'use strict';

module.exports = function(app) {
  var userList = require('../controllers/userController');

  app.route('/tasks')
    .get(userList.list_all_users)
    .post(userList.create_user);


  app.route('/tasks/:taskId')
    .get(userList.list_user)
    .put(userList.update_user)
    .delete(userList.delete_user);
};