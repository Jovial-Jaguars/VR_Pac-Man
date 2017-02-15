var Sequelize = require('sequelize');
var sequelize = new Sequelize('PacmanVR', 'root', '');
var bcrypt = require('bcrypt-nodejs');

var Maps = require('./maps');

var User = sequelize.define('User', {
  oAuthID: {
    type: Sequelize.STRING,
    defaultValue: null
  },
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
    unique: true,
    defaultValue: null,
    validate: {
      isEmail: true,
      notEmpty: true,
      len: [1, 255]
    }
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  spHighScores_PC: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  spHighScores_VR: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  mpHighScores_PC: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  mpHighScores_VR: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  freezeTableName: true,
  classMethods: {
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password, hash) {
      console.log('hash in validPw:', hash);
      // return 'pacmanx';
      return bcrypt.compareSync(password, hash);
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