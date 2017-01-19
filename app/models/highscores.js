var Sequelize = require('sequelize');
var sequelize = new Sequelize('PacmanVR', 'root', '');

var spHighScores_PC = sequelize.define('spHighScores_PC', {
  username: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }, {
  freezeTableName: true
});

var spHighScores_VR = sequelize.define('spHighScores_VR', {
  username: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }, {
  freezeTableName: true
});

var mpHighScores_PC = sequelize.define('mpHighScores_PC', {
  username: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }, {
  freezeTableName: true
});

var mpHighScores_VR = sequelize.define('mpHighScores_VR', {
  username: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }, {
  freezeTableName: true
});

module.exports = {
  spHighScores_PC: spHighScores_PC,
  spHighScores_VR: spHighScores_VR,
  mpHighScores_PC: mpHighScores_PC,
  mpHighScores_PC: mpHighScores_VR
}