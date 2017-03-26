var indexFile = require('../index.js');
var sequalize = indexFile.sequalize;

console.log(indexFile.sequalize);


var User = sequelize.define('user', {
  id: {
  	type: Sequelize.BIGINT(11),
  	autoIncrement: true,
  	primaryKey: true,
  	field: 'id'
  },
  username: {
    type: Sequelize.STRING,
    field: 'username' 
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  email: {
  	type: Sequelize.STRING,
  	field: 'email'
  },
  firstName: {
  	type: Sequelize.STRING,
  	field: 'first_name'
  },
  lastName: {
  	type: Sequelize.STRING,
  	field: 'last_name';
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = sequalize.model('User', User);
