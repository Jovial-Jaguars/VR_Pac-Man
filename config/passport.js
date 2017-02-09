var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');
var jwt = require('jsonwebtoken');
var supersecret = require('../config/config');

module.exports = function(passport) {
  // serialize and deserialize users for sessions
  // passport.serializeUser(function(user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function(username, done) {
  //   User.find({ username: username })
  //   .then(function(user) {
  //     done(null, user);
  //   });
  // });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
   User.find({ where: {username: username}, raw: true })
    .then(function(user) {
      console.log('hits found query');
      console.log('balhblablahbhla');
      console.log('user:',user.password);
      if (!user) {
        console.log('hit !user');
        // return done(err);
        return done(null, false, {message: 'Invalid username.'});
        // return done(null, false, req.flash('loginMessage', 'User not found.'));
      }
      var hash = user.password;
      if (!User.validPassword(password, hash)) {
        console.log('***Enter valid password condition***');
        // return done(err);
        return done(null, false, {message: 'Invalid password.'});
        // return done(null, false, req.flash('loginMessage', 'Invalid password.'));
      }
      if (!user.active) {
        return done(null, false, {message: 'Please activate your account by following the instructions in the account confirmation email you received to proceed.'});
      }
      //login success
      console.log('login success');
      var token = jwt.sign({user}, supersecret.secret, {
          expiresIn: '90d' // expires in 90 days
        });
      console.log('token:', token);
      user.update({ token: token });
      // user = user.dataValues.username;
      return done(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    console.log('req.body:',req.body);
      User.find({ where: {username: username} })
      .then(function(user) {
        if (user) {
          // return done(err);
          return done(null, false, {message: 'Username already exists.'});
          // return done(null, false, req.flash('signupMessage', 'That username is already taken!'));
        }
        else if (!user) {
          var token = jwt.sign({user}, supersecret.secret, {
              expiresIn: '90d' // expires in 90 days, unit seconds
            });
          User.create({
            username: username,
            email: req.body.email,
            password: User.generateHash(password),
            token: token
          })
          .then(function(user, test) {
            //signup success
            // var newUser = user.dataValues.username;
            return done(null, user);
          })
          .catch(function(err) {
            return done(err);
            // return done(null, false, {message: 'Error.'});
          });
        }
      })
  }));
}

