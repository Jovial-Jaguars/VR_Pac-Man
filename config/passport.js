var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
  // serialize and deserialize users for sessions
  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    User.find({ username: username })
    .then(function(user) {
      done(null, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
   User.find({ where: {username: username} })
    .then(function(user) {
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'User not found.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Invalid password.'));
      }
      return done(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
      User.find({ where: {username: username} })
      .then(function(user) {
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken!'));
        }
        else if (!user) {
          var newUser = User.build({
            username: username,
            password: user.generateHash(password)
          })
          .save()
          .catch(function(err) {
            return done(null, user);
          });
        }
        return done(null, user);
      })
      .catch(function(err) {
        return done(null, user);
      })
  }));
}

