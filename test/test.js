var should = require('chai').should();
var expect = require('chai').expect();
var supertest = require('supertest');
var api = supertest('http://localhost:3000');

describe('Check Login', function() {

  it('should return a 302 response if not logged in', function(done) {
    api.get('/checkLoggedIn')
    .set('Accept', 'application/json')
    .expect(302, done);
  });


});