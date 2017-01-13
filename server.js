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

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  })
});



// DATABASE
var mysql = require('mysql');

mysql.createConnection({
  user: root,
  password: '',
  database: 'PacmanVR'
});

var Sequelize = require('sequelize');
var sequelize = new Sequelize('PacmanVR', 'root', '');

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
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '/client')));
app.use(session({ secret: 'wells', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// ROUTES
require('./app/routes.js')(app, passport);


app.listen(port, function() {
  console.log('Server is now connected on port ' + port);
}).on('error', function(err) {
  console.log('err:', err);
});
