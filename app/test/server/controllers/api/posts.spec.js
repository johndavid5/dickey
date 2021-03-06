// #3: Simple Real Test of Controller - using SuperTest
// You're actually testing the controller now.
// You're checking to see whether it responds
// with a 200 status code. 
var api = require('../../support/api'); // "supertest" version of the API...
var user = require('../../support/user'); // user authentication shortcut using "jsonwebtoken"...
var expect = require('chai').expect;

describe('controllers.api.posts', function(){
	describe('GET /api/posts - HTTP 200 Response', function(){
		it('exists', function(done){
			console.log("STEED: Just checking for HTTP response 200 from GET /api/posts...");
			api.get('/api/posts')
			.expect(200)
			.end(done);
		});
	});
});

var Post = require('../../../../models/post');

describe('controllers.api.posts', function(){

	beforeEach(function(done){
		Post.remove({}, done); // Remove all posts...
	});


	describe('POST /api/posts', function(){

		var token;

		// Part I: Create the user and save their token
		// in the "token" variable...
		beforeEach(function(done){
			console.log("STEED: Creating user 'arnie', Mrs. Peel...");
			user.create('arnie', 'pass', function(err, user){
				token = user.token;
				done(err);
			});
		});

		var cw_post = 'Let off some steam, Bennett!';

		// Part II: 
		beforeEach(function(done){
			console.log("STEED: Just posting cw_post = '" + cw_post + "', Mrs. Peel...");
			api.post('/api/posts')
			.send({body: cw_post })
			.set('X-Auth', token)
			.expect(201)
			.end(done)
		});

		it('added 1 new post', function(done){
			console.log("STEED: Just see if we have a post equal to cw_post, Mrs. Peel...");
			Post.findOne(function(err, post){
				expect(post.body).to.equal( cw_post );
				done(err);
			});
		});

	}); /* describe 'POST /api/posts' */

	describe('GET /api/posts', function(){
		var test_posts = [
			{username: 'bennett',
			 body: 'I love listening to your little piss-ant soldiers trying to talk tough. ' +
			 'They make me wanna laugh. ' +
			 'If Matrix was here, he\'d laugh, too.'},
			{username: 'arias',
			 body: 'Mister Bennett, my soldiers are patriots.'},
			{username: 'bennett',
			 body: 'Your soldiers are nothin\'.  Matrix and I could kill every one of \'em...in the blink of an eye.  Remember that.'},
			{username: 'arias',
			 body: 'Are you trying to frighten me...?'},
			{username: 'bennett',
			 body: 'I don\'t hafta try.  When Matrix finishes the job, he\'ll be back for his daughter. ' +
			  'Now whether she\'s alive or dead, doesn\'t matter. ' +
			  'Then he\'ll be after you. ' +
			  'Now the only thing between Matrix and you...is me.'},
			{username: 'arias',
			 body: 'It is you that is afraid, Mister Bennett...YOU are afraid of Matrix.'},
			{username: 'bennett',
			 body: 'Of course.  I\'m smart!  But I have an edge: I have his daughter.'},
		];

		beforeEach(function(done){
			console.log('Posting ' + test_posts.length + ' posts via the Post model...');
			Post.create( test_posts, done );
		});
		
		it('has ' + test_posts.length + ' posts', function(done){
			console.log("STEED: Just checking to see if there are " + test_posts.length + " posts.");
			api.get('/api/posts')
			.expect(200)
			.expect(function(response){
				expect(response.body).to.have.length(test_posts.length);
			})
			.end(done);
		});

	});/* describe 'GET /api/posts' */


});


// #1: Simpleton Test - For Existence of controller...
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

// #3 Faux Test - Completely Bogus
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



