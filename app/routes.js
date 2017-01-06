module.exports = function(app, passport) {

  app.get('/*', function(req, res) {
    res.redirect('/');
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
    })
  );

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
    })
  );

  app.get('/profile', isLoggedIn, function(req, res) {
    res.send(req.user);
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  // if user is authenticated, continue
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('user is not authenticated man');
  // else, redirect to home page
  res.redirect('/');
};