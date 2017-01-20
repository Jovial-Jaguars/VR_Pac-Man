var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');

describe('Check Local Auth', function() {

  function signupUser() {
    return function(done) {
      api
        .post('/signup')
        .send({username: 'testUser', email: 'testEmail@gmail.com', password: 'fakepassword'})
        .expect(302)
        .expect('Location', '/profile')
        .end(onResponse);

      function onResponse(err, res) {
        if (err) {
          return done(err);
        }
        return done();
      }
    }
  };

  it('should signup properly', signupUser());

  function logoutUser() {
    return function(done) {
      api
        .get('/logout')
        .expect(302)
        .expect('Location', '/')
        .end(onResponse);

      function onResponse(err, res) {
        if (err) {
          return done(err);
        }
        return done();
      }
    }
  };

  it('should logout properly', logoutUser());

  it('should not be able to access protected pages while logged out', function(done) {
    api
      .get('/checkLoggedIn')
      .expect(302, done);
  })

  function loginUser() {
    return function(done) {
      api
        .post('/login')
        .send({username: 'testUser', password: 'fakepassword'})
        .expect('Location', '/profile')
        .expect(302)
        .end(onResponse);

      function onResponse(err, res) {
        if (err) {
          return done(err);
        }
        return done();
      }
    }
  };

  it('should login properly to an existing account', loginUser());

  it('should be able to access protected pages while logged in', function(done) {
    api
      .get('/checkLoggedIn')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        console.log(res.body);
        expect(res.body).to.exist;
        done();
      });
  })


});