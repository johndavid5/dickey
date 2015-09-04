// For testing, create a new _express_ app using
// our new base router, then return it wrapped
// in SuperTest. 
var express = require('express');
var request = require('supertest');
var router = require('../../../controllers');

var app = express();
app.use(router);

module.exports = request(app);
