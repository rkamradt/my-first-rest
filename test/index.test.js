
var should = require('should');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');
var morgan = require('morgan');
var router = require('../server/router');
var mongoload = require('../server/mongoload');

describe('Rest API with mongo storage', function(){
  var app;
  before(function(done) {
    app = express();

    // parse application/json
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(morgan('dev', { format: 'dev', immediate: true }));
    app.use(router());
    mongoload.load(function(err) {
      if(err) {
        console.log('error loading data into mongo');
        return done(err);
      }
      done();
    });
  });
  it('should be able to find all data', function(done) {
    request(app)
      .get('/')
      .expect(200) //Status code
//      .expect('Content-Type', /json/)
      .end(function(err,res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceOf(Object);
        done();
    });
  });
});
