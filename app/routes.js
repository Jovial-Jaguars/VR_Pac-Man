var User = require('../app/models/user');
var Maps = require('../app/models/maps');
var HighScores = require('../app/models/highscores');

var jwt = require('jsonwebtoken');
var supersecret = require('../config/config');

module.exports = function(app, passport) {

  // app.post('/login', passport.authenticate('local-login'), function(req, res) {
  //   console.log('req.body:',req.body);
  //     if (!user) {
  //       res.send(info);
  //     }
  //     if (user) {
  //       res.send(user);
  //     }
  //     res.send('hit nothing');
  // });

  // app.post('/login', function(req, res, next) {
  //   console.log('hit')
  //   passport.authenticate('local-login', function(err, user, info) {
  //     console.log('hit');
  //     console.log(err, user, info);
  //     res.send(user);
  //   })
  // })
  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info, status) {
      if (err) {
        return next(err);
      } else if (!user) {
        res.send(info);
      } else {
        // send back a json web token upon successful login
        var token = jwt.sign({user}, supersecret.secret, {
          expiresIn: '90d' // expires in 90 days
        });
        res.send({username: user, token: token});
      }
    })(req, res, next);
  });

  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/profile',
  //   failureRedirect: '/#/failure',
  //   failureFlash: true
  //   })
  // );

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info, status) {
      if (err) {
        return next(err);
      } else if (!user) {
        res.send(info);
      } else {
        console.log('hit4')
        // send back a json web token upon successful signup
        var token = jwt.sign({user}, supersecret.secret, {
          expiresIn: '90d' // expires in 90 days, unit seconds
        });
        res.send({username: user, token: token});
      }
    })(req, res, next);
  });

  // app.get('/checkLoggedIn', function(req, res) {
  //   if (!req.isAuthenticated()) {
  //     res.redirect('/');
  //   } else {
  //     res.send(req.session.passport);
  //   }
  // });

  app.post('/profileInfo', function(req, res) {
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

  app.post('/maps', function(req, res) {
    Maps.create({
      mapData: req.body.mapData,
      shareable: req.body.shareable,
      user_id: req.body.username
    }).then(function() {
      res.end();
    });
  })

  app.get('/maps', function(req, res) {
    var getMaps = {};
    Maps.findAll({
      where: {shareable: true}
    }).then(function(publicMaps) {
      getMaps[0] = publicMaps;
      Maps.findAll({
        where: {user_id: req.query.username}
      }).then(function(userMaps) {
        getMaps[1] = userMaps;
        res.send(getMaps);
      })
    });
  });

  /* For ranked room assignments, there are two options a user can encounter. Either (1) there is no element in the waitingRoom array and a random room number is generated and joined or (2) there is a waiting room and it is joined, shifted from waiting room, and added to roomsInPlay object.
  In the case that a user leaves a waiting room before another user joins, the room will be spliced from the waiting room and not added to rooms in play */

  var waitingRoomRanked = [];
  var roomsInPlayRanked = {};
  app.get('/assignGameRoomRanked', function(req, res) {
    if (waitingRoomRanked.length === 0) {
      var generateRandomRoom = function() {
        var num = Math.ceil(Math.random() * 1000000000);
        if (roomsInPlayRanked[num]) {
          return generateRandomRoom();
        } else {
          return num;
        }
      };
      var randomRoomNumber = generateRandomRoom();
      waitingRoomRanked.push(randomRoomNumber);
      res.send(randomRoomNumber.toString());
    } else if (waitingRoomRanked.length > 0) {
      var roomNumber = waitingRoomRanked.shift();
      roomsInPlayRanked[roomNumber] = 2;
      res.send(roomNumber.toString());
    }
    // res.send(roomNumber.toString());
  }.bind(this));

  app.post('/leaveGameRoomRanked', function(req, res) {
    var roomNumber = req.body.room.slice(4);
    console.log(req.session.passport.user + ' left room number:', roomNumber);
    console.log('roomsInPlayRanked:', roomsInPlayRanked);
    if (roomsInPlayRanked[roomNumber]) {
      roomsInPlayRanked[roomNumber]--;
      if (roomsInPlayRanked[roomNumber] <= 0) {
        console.log('hit');
        delete roomsInPlayRanked[roomNumber];
      }
      console.log('roomsInPlayRanked:', roomsInPlayRanked);
    } else if (!roomsInPlayRanked[roomNumber]) {
      console.log('waitingRoom', waitingRoomRanked);
      waitingRoomRanked.forEach(function(room, idx) {
        if (room === Number(roomNumber)) {
          waitingRoomRanked.splice(idx, 1);
        }
      });
      console.log('waitingRoom', waitingRoomRanked);
    }
    res.end();
  });


  var customRooms = {};
  app.post('/createCustomRoom', function(req, res) {
    var roomName = req.body.room;
    if (!customRooms[roomName]) {
      customRooms[roomName] = 1;
      res.send('created');
    } else if (customRooms[roomName]) {
      res.send('taken');
    }
  });

  app.get('/joinCustomRoom', function(req, res) {
    var roomName = req.query.room;
    if(!customRooms[roomName]) {
      res.send('not found');
    } else if (customRooms[roomName] && customRooms[roomName] === 1) {
      customRooms[roomName]++;
      res.send('joined')
    } else if (customRooms[roomName] && customRooms[roomName] >= 2) {
      res.send('room full');
    }
  });

  app.post('/leaveGameRoomCustom', function(req, res) {
    var roomNumber = req.body.room.slice(4);
    console.log(req.session.passport.user + ' left room number:', roomNumber);
    customRooms[roomNumber]--;
    if (customRooms[roomNumber] <= 0) {
      delete customRooms[roomNumber];
    }
    res.end();
  })



  app.get('/joinCustomRoom', function(req, res) {

  })

  app.post('/leaveGameRoomCustom', function(req, res) {
    var roomNumber = req.body.room.slice(4);
    console.log(req.session.passport.user + ' left room:', roomNumber);

  })

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
  });

  app.post('/updateMyMapSharing', function(req, res) {
    console.log(req.body.apiPackage);
    var myMaps = req.body.apiPackage;
    myMaps.forEach(function(entry) {
      Maps.update(
        {shareable: entry.shareable},
        {
          where: {user_id: req.session.passport.user,
                  mapData: entry.mapData}
        })
      .error(function() {
        console.log('error updating');
        res.sendStatus(404).send('Error updating my mazes');
      });
    });
    res.send('My mazes publicity options have been updated!');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
    });

  app.get('/verifytoken', function(req, res) {
    console.log('hit verify token in server')
    var token = req.headers['x-access-token'];
    if (token) {
      console.log('hit token exists in server')
      jwt.verify(token, supersecret.secret, function(err, decoded) {
        if (err) {
          return res.json({success: false, message: 'Failed to authenticate token.'});
        } else {
          console.log('decoded:', decoded);
          return res.json({success: true, message: 'Authenticated token.', decoded: decoded});
        }
      });
    } else {
      console.log('hit token doesnt exist in server');
      return res.status(403).send({success: false, message: 'No token provided.'});
    }
  })

  app.get('*', function(req, res) {
    res.redirect('/');
  })
};




// function isLoggedIn(req, res, next) {
//   // if user is authenticated, continue
//   if (req.isAuthenticated()) {
//     console.log('user is authenticated');
//     return next();
//   }
//   console.log('user is not authenticated man');
//   // else, redirect to home page
//   res.redirect('/');
// };