var Sequelize = require('sequelize');
var sequelize = new Sequelize('PacmanVR', 'root', '');

var spHighScores_PC = sequelize.define('spHighScores_PC', {
  username: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
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
  }
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
  }
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
  }
}, {
  freezeTableName: true
});

// force: true will drop the table if it already exists
spHighScores_PC.sync({force: true}).then(function () {
  spHighScores_PC.create({
    username: 'wells',
    score: 999999
  });
  spHighScores_PC.create({
    username: 'don',
    score: 4
  });
  spHighScores_PC.create({
    username: 'humaid',
    score: 2
  });
  spHighScores_PC.create({
    username: 'hk2',
    score: 9
  });
  spHighScores_PC.create({
    username: 'newb2435',
    score: 42
  });
  spHighScores_PC.create({
    username: 'newbie123',
    score: 522
  });
  spHighScores_PC.create({
    username: 'beginner',
    score: 1010
  });
  spHighScores_PC.create({
    username: 'dknguyen',
    score: 6
  });
  spHighScores_PC.create({
    username: 'trash',
    score: 5
  });
  spHighScores_PC.create({
    username: 'wellswannabe',
    score: 9999
  });
});

module.exports = {
  spHighScores_PC: spHighScores_PC,
  spHighScores_VR: spHighScores_VR,
  mpHighScores_PC: mpHighScores_PC,
  mpHighScores_PC: mpHighScores_VR
}