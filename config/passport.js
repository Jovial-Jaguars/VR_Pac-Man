var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../app/models/user');
var jwt = require('jsonwebtoken');
var supersecret = require('../config/config');

module.exports = function(passport) {
  // serialize and deserialize users for sessions
  passport.serializeUser(function(user, done) {
    console.log('hit serialize')
    done(null, user);
  });

  passport.deserializeUser(function(username, done) {
    console.log('hit deserialize')
    User.find({ username: username })
    .then(function(user) {
      done(null, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: supersecret.FACEBOOK_APP_ID,
    clientSecret: supersecret.FACEBOOK_APP_SECRET,
    callbackURL: `${supersecret.link}/auth/facebook/callback`
    // profileFields: ['id', 'displayName'],
    // enableProof: true
  }, function(accessToken, refreshToken, profile, cb) {
    console.log('profile:',profile)
    var user = {oAuthID: profile.id, username: profile.displayName};
    User.findOrCreate({where: {
      oAuthID: profile.id,
    }, defaults: {
        username: profile.displayName,
        active: true
      }}).then(function(user) {
      return cb(null, user);
    }).catch(function(err) {
      return cb(err, null);
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
   User.find({ where: {username: username} })
    .then(function(user) {
      console.log('hits found query');
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
      if (!user.dataValues.active) {
        return done(null, false, {message: 'Please activate your account by following the instructions in the account confirmation email you received to proceed.'});
      }
      //login success
      console.log('login success');
      console.log('user:', user.dataValues)
      // var token = jwt.sign({user}, supersecret.secret, {
      //     expiresIn: '90d' // expires in 90 days
      //   });
      // console.log('token:', token);
      // user.update({ token: token });
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
      User.find({ where: {username: username}})
      .then(function(user) {
        if (user) {
          // return done(err);
          return done(null, false, {message: 'Username already exists.'});
          // return done(null, false, req.flash('signupMessage', 'That username is already taken!'));
        }
        else if (!user) {
          // var token = jwt.sign({user}, supersecret.secret, {
          //     expiresIn: '90d' // expires in 90 days, unit seconds
          //   });
          var unique = {username: req.body.username, email: req.body.email};
          var token = jwt.sign({unique}, supersecret.secret, {
          expiresIn: '2d' // expires in 2 days
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

