var Sequelize = require('sequelize');
var sequelize = new Sequelize('PacmanVR', 'root', '');
var bcrypt = require('bcrypt-nodejs');

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 20]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
      len: [1, 255]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  instanceMethods: {
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  return User.create({
    username: 'admin',
    email: 'testtest@gmail.com',
    password: 'admin'
  });
});

module.exports = User;