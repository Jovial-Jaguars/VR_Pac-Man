var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
  // serialize and deserialize users for sessions
  passport.serializeUser(function(user, done) {
    done(null, user);
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
        console.log('hit !user');
        // return done(err);
        return done(null, false, {message: 'Invalid username.'});
        // return done(null, false, req.flash('loginMessage', 'User not found.'));
      }
      var hash = user.dataValues.password;
      if (!User.validPassword(password, hash)) {
        console.log('***Enter valid password condition***');
        // return done(err);
        return done(null, false, {message: 'Invalid password.'});
        // return done(null, false, req.flash('loginMessage', 'Invalid password.'));
      }
      //login success
      console.log('login success');
      user = user.dataValues.username;
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
      User.find({ where: {username: username} })
      .then(function(user) {
        if (user) {
          // return done(err);
          return done(null, false, {message: 'Username already exists.'});
          // return done(null, false, req.flash('signupMessage', 'That username is already taken!'));
        }
        else if (!user) {
          User.create({
            username: username,
            email: req.body.email,
            password: User.generateHash(password)
          })
          .then(function(user) {
            //signup success
            var newUser = user.dataValues.username;
            return done(null, newUser);
          })
          .catch(function(err) {
            // return done(err);
            return done(null, false, {message: 'Error.'});
          });
        }
      })
  }));
}

