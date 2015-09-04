// #3: Simple Real Test of Controller - using SuperTest
var api = require('../../support/api');

describe('controllers.api.posts', function(){
	describe('GET /api/posts', function(){
		it('exists', function(done){
			api.get('/api/posts')
			.expect(200)
			.end(done);
		});
	});
});


// #1: Simpleton Test
//
// var expect = require('chai').expect;
// 
// var ctrl = require('../../../../controllers/api/posts');
// 
// console.log("Mocha #1...");
// describe('controllers.api.posts', function(){
// 	it('exists', function(){
// 		expect(ctrl).to.exist;
// 	});
// });

// #3 Faux Test
// 
// var request = require('supertest');
// var express = require('express');
// var app = express();
// 
// console.log("Mocha #2...");
// app.get('/user', function(req, res){
// 	res.status(200).send({name: 'arnie'});
// });
// 
// console.log("Mocha #3...");
// describe('GET /users', function(){
// 	it('responds with proper json', function(done){
// 		request(app)
// 		.get('/user')
// 		.expect('Content-Type', /json/)
// 		.expect({name: 'arnie'}, done)
// 	});
// });
// 
// console.log("Mocha Jokah...");
//



