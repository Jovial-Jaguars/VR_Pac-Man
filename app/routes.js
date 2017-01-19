var User = require('../app/models/user');
var Maps = require('../app/models/maps');
var HighScores = require('../app/models/highscores');

module.exports = function(app, passport) {

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/#/failure',
    failureFlash: true
    })
  );

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/#/failure',
    failureFlash: true
    })
  );

  app.get('/checkLoggedIn', function(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.send(req.session.passport);
    }
  });

  app.post('/profileInfo', isLoggedIn, function(req, res) {
    console.log('hit profileinfo request.');
    // console.log('req.body:', req.body);
    User.findOne({
      where: {
        username: req.body.user
      }, raw:true
    }).then(function(user) {
      res.send(user);
    });
  });

  app.post('/maps', isLoggedIn, function(req, res) {
    console.log('hit /post maps in server!');
    console.log('req.session.passport.user:', req.session.passport.user);
    console.log(req.body);
    Maps.create({
      mapData: req.body.mapData,
      shareable: req.body.shareable,
      user_id: req.body.username
    }).then(function() {
      res.end();
    });
  })

  app.get('/maps', isLoggedIn, function(req, res) {
    var getMaps = {};
    Maps.findAll({
      where: {shareable: true}
    }).then(function(publicMaps) {
      getMaps[0] = publicMaps;
      Maps.findAll({
        where: {user_id: req.session.passport.user}
      }).then(function(userMaps) {
        getMaps[1] = userMaps;
        res.send(getMaps);
      })
    });
  });

  var roomNumber = 1;
  var participants = 0;
  app.get('/assignGameRoom', function(req, res) {
    participants++;
    if (participants > 2) {
      roomNumber++;
      participants = 1;
    }
    res.send(roomNumber.toString());
  }.bind(this));

  app.post('/submitScore', function(req, res) {
    if (!req.session.passport || !req.session.passport.user) {
      res.end('authentication error');
    } else {
      var table = req.body.table;
      var score = Number(req.body.score);
      var username = req.session.passport.user;
      HighScores[table].create({
        username: username,
        score: score
      }).then(function() {
        res.send('Score posted!');
      })
    }
  });

  app.get('/highScoreTable', function(req, res) {
    var table = req.query.table;
    HighScores[table].findAll({raw:true}).then(function(arr) {
      var sorted = arr.sort(function(a,b) {
        return b.score-a.score;
      });
      res.send(sorted);
    })
  });

  app.post('/updateMyHighScores', function(req, res) {

    User.findOne({
      where: {
        username: req.session.passport.user
      }, raw:true
    })
    .then(function(user) {
      var table = req.body.table;
      console.log('table', table);
      console.log(user);
      console.log('req.body.score', req.body.score);
      console.log('user[table]', user[table]);
      // compare user.table high score with req.body.score
      if (req.body.score > user[table]) {
        console.log('hit');
        User.update(
          {[table]: req.body.score},
          {
            where: {username: req.session.passport.user}
          }
        )
      }
      res.send(user);
    });
  })


  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
    });

  app.get('*', function(req, res) {
    res.redirect('/');
  })
};




function isLoggedIn(req, res, next) {
  // if user is authenticated, continue
  if (req.isAuthenticated()) {
    console.log('user is authenticated');
    return next();
  }
  console.log('user is not authenticated man');
  // else, redirect to home page
  res.redirect('/');
};