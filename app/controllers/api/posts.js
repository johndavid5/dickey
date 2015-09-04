var jutils = require('../../../lib/jutils.js');
var websockets = require('../../websockets');
//var pubsub = require('../../pubsub');
//var publish = require('../../publisher');
//var subscribe = require('../../subscriber');
var Post = require('../../models/post');

// Use Express's Router object...acting like an app object...
// ...use like middleware to attach it to your app...
var router = require('express').Router();

var sWho = "posts.js";

//app.get('/api/posts',
//router.get('/api/posts', 
router.get('/',
	function(req, res, next){
		console.log( "[" + jutils.dateTimeCompact() + "]: " +
		"Got request on '/api/posts'...doing Post.find()..."
		);

		Post.find()
		//.sort('-date')
		.sort('-_id')
		.exec(function(err, posts){
			if(err){
				console.log('Error during Post.find: err = ', err );
				return next(err)
			}

			
			//console.log("Before custom sort: posts = ", posts );

			//posts.sort( function( post1, post2 ){
			//		return post1._id - post2._id;
			//});

			//console.log("After custom sort: posts = ", posts );

			console.log('Post.find successful; sending posts to client, posts =', posts);
			res.json(posts);
		});
	}
);


//app.post('/api/posts',
//router.post('/api/posts', 
router.post('/',

	function(req, res, next){
		console.log( "[" + jutils.dateTimeCompact() + "]: " +
		"Got POST request on '/api/posts'...(someone POST-ed a post...)"
		);
		//console.log( "[" + jutils.dateTimeCompact() + "]: " +
		//"req = ", req
		//);
		console.log('post received!');
		console.log("req.body = ", req.body );

		// Implicitly uses bodyParser.json():
		console.log("req.body.username = '" + req.body.username + "'...");

		// Nice, Dickey, req.body.body...isn't that a bit confusing? 
		console.log("req.body.body = '" + req.body.body + "'...");

		// Build a new instance of the Post model...
		// Implicitly uses bodyParser.json():
		var post = new Post({		
			//username: req.body.username,
			body: req.body.body
		});

		if( req.auth && req.auth.username ){
			// req.auth.username magically filled in by
			// "auth" middleware...
			post.username = req.auth.username;
		}
		else {
			post.username = "guest";
		}

		console.log('New post = ', post );
		console.log('Saving post to mongodb...');

		post.save(
			function(err, post){
				if(err){
					console.log('Error during post.save: err = ', err );
					return next(err); // Triggers code 500 in Express...
				}
				// Return the JSON to the client...
				// ...not totally necessary, but
				// the client may be able to make
				// use of it, for example the _id
				// field or the "date" field that
				// the server generated...
				console.log('post.save successful...');
				// Tue, 21 Oct 2014 23:26:56 GMT express
				// deprecated res.json(status, obj): Use res.
				// status(status).json(obj) instead at server.js:60:9
				//res.json(201, post);

				console.log(sWho + ": Calling websockets.broadcast('new_post',", post, ")...");
				websockets.broadcast('new_post', post); 
				//pubsub.publish('new_post', post);
				//publish('new_post', post);

				console.log('Sending new post to http client...');
				res.status(201).json(post);
			}
		);
	}
); /* router.post() */

//pubsub.subscribe('new_post', function(post){
//subscribe('new_post', function(post){
//	console.log(sWho + ': subscribe(): broadcasting new post', post, 'to all websockets clients...');
//	websockets.broadcast('new_post', post);
//});

module.exports = router;
