var Sequelize = require("sequelize");
var sequelize = new Sequelize({
  database: "PacmanVR",
  username: "root",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  dialect: "mysql",
});

var spHighScores_PC = sequelize.define(
  "spHighScores_PC",
  {
    username: {
      type: Sequelize.STRING,
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

var spHighScores_VR = sequelize.define(
  "spHighScores_VR",
  {
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

var mpHighScores_PC = sequelize.define(
  "mpHighScores_PC",
  {
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

var mpHighScores_VR = sequelize.define(
  "mpHighScores_VR",
  {
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// force: true will drop the table if it already exists
spHighScores_VR.sync({ force: true }).then(function () {
  spHighScores_VR.create({
    username: "wells",
    score: 20,
  });
  spHighScores_VR.create({
    username: "don",
    score: 4,
  });
  spHighScores_VR.create({
    username: "humaid",
    score: 2,
  });
  spHighScores_VR.create({
    username: "hk2",
    score: 9,
  });
  spHighScores_VR.create({
    username: "newb2435",
    score: 42,
  });
  spHighScores_VR.create({
    username: "dknguyen",
    score: 6,
  });
  spHighScores_VR.create({
    username: "trash",
    score: 5,
  });
});

spHighScores_PC.sync({ force: true }).then(function () {
  spHighScores_PC.create({
    username: "wells",
    score: 10,
  });
});

mpHighScores_VR.sync({ force: true }).then(function () {
  mpHighScores_VR.create({
    username: "wells",
    score: 10,
  });
});

mpHighScores_PC.sync({ force: true }).then(function () {
  mpHighScores_PC.create({
    username: "wells",
    score: 10,
  });
});

module.exports = {
  spHighScores_PC: spHighScores_PC,
  spHighScores_VR: spHighScores_VR,
  mpHighScores_PC: mpHighScores_PC,
  mpHighScores_VR: mpHighScores_VR,
};
