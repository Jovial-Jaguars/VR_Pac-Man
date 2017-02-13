var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var helmet = require('helmet');


io.on('connection', function(socket) {
  console.log('a user connected');

  // io.to('some room').emit('some event');
  socket.on('join', function(room) {
    console.log('a user joined a room:', room);
    socket.join(room);
    // io.to(room).emit('test', 'room message from server sent');

    socket.on('coordinates', function(coords) {
      socket.broadcast.to(room).emit('otherPlayerCoords', coords);
    });

    socket.on('pelletCollision', function(pelletId) {
      console.log('hit pellet collision in server', pelletId);
      socket.broadcast.to(room).emit('otherPlayerPelletCollision', pelletId);
    });

    socket.on('leave', function(room) {
      console.log('a user left the room:', room);
      socket.leave(room);
    })

  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

});



// DATABASE
var mysql = require('mysql');
var supersecret = require('./config/config');

mysql.createConnection({
  user: root,
  password: supersecret.dbPassword,
  database: 'PacmanVR'
});

var Sequelize = require('sequelize');
var sequelize = new Sequelize('PacmanVR', 'root', supersecret.dbpassword);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection established successfully!');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

require('./config/passport')(passport); //pass passport for configuration

// MIDDLEWARE
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '/client')));
app.use(session({ secret: 'wells' }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());


// ROUTES
require('./app/routes.js')(app, passport);


http.listen(port, function() {
  console.log('Server is now connected on port ' + port);
}).on('error', function(err) {
  console.log('err:', err);
});
