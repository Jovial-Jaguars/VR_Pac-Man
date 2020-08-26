const express = require("express");
//const fs = require('fs')
// const sslPath = '/etc/letsencrypt/live/vrpacman.com/';
// const options = {
//   key: fs.readFileSync(sslPath + 'privkey.pem'),
//   cert: fs.readFileSync(sslPath + 'fullchain.pem')
// };

const app = express();
const http = require("http").Server(app);
//const http = require('https').createServer(options, app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000; // 443

const passport = require("passport");
const flash = require("connect-flash");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const helmet = require("helmet");

io.on("connection", function (socket) {
  console.log("a user connected");

  // io.to('some room').emit('some event');
  socket.on("join", function (room) {
    console.log("a user joined a room:", room);
    socket.join(room);
    // io.to(room).emit('test', 'room message from server sent');

    socket.on("coordinates", function (coords) {
      socket.broadcast.to(room).emit("otherPlayerCoords", coords);
    });

    socket.on("pelletCollision", function (pelletId) {
      console.log("hit pellet collision in server", pelletId);
      socket.broadcast.to(room).emit("otherPlayerPelletCollision", pelletId);
    });

    socket.on("leave", function (room) {
      console.log("a user left the room:", room);
      socket.leave(room);
    });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

// DATABASE
var mysql = require("mysql");

mysql.createConnection({
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "PacmanVR",
});

var Sequelize = require("sequelize");
var sequelize = new Sequelize({
  database: "PacmanVR",
  username: "root",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function (err) {
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

require("./config/passport")(passport); //pass passport for configuration

// MIDDLEWARE
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/client")));
app.use(session({ secret: "wells" }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

// ROUTES
require("./app/routes.js")(app, passport);

http
  .listen(port, function () {
    console.log("Server is now connected on port " + port);
  })
  .on("error", function (err) {
    console.log("err:", err);
  });
