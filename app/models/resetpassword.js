var Sequelize = require("sequelize");
var sequelize = new Sequelize({
  database: "PacmanVR",
  username: "root",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  dialect: "mysql",
});

var ResetPassword = sequelize.define(
  "ResetPassword",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

ResetPassword.sync({ force: false });

module.exports = ResetPassword;
