var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');



// DATABASE
var mysql = require('mysql');

mysql.createConnection({
  user: root,
  password: null,
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


app.use(express.static(path.join(__dirname, './')));
require('./config/passport')(passport); //pass passport for configuration



// MIDDLEWARE
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.use(session({ secret: 'wells'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// ROUTES
require('./app/routes.js')(app, passport);


app.listen(port, function() {
  console.log('Server is now connected on port 3000');
});