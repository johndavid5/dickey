var jutils = require('../../../lib/jutils.js');
var Post = require('../../models/post');

// Use Express's Router object...acting like an app object...
// ...use like middleware to attach it to your app...
var router = require('express').Router();

//app.get('/api/posts',
//router.get('/api/posts', 
router.get('/',
	function(req, res, next){
		console.log( "[" + jutils.dateTimeCompact() + "]: " +
		"Got request on '/api/posts'...doing Post.find()..."
		);

		Post.find()
		.sort('-date')
		.exec(function(err, posts){
			if(err){
				console.log('Error during Post.find: err = ', err );
				return next(err)
			}

			console.log('Post.find successful; sending posts to client, posts =', posts);
			res.json(posts);
		})
	}
);


//app.post('/api/posts',
//router.post('/api/posts', 
router.post('/',
	function(req, res, next){
		console.log( "[" + jutils.dateTimeCompact() + "]: " +
		"Got POST request on '/api/posts'..."
		);
		//console.log( "[" + jutils.dateTimeCompact() + "]: " +
		//"req = ", req
		//);
		console.log('post received!');
		console.log("req.body = ", req.body );

		// Implicitly uses bodyParser.json():
		console.log("req.body.username = '" + req.body.username + "'...");
		console.log("req.body.body = '" + req.body.body + "'...");

		// Build a new instance of the Post model...
		var post = new Post({		
			// Implicitly uses bodyParser.json():
			username: req.body.username,
			body: req.body.body
		})

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
				console.log('post.save successful; sending new post to client...');
				// Tue, 21 Oct 2014 23:26:56 GMT express
				// deprecated res.json(status, obj): Use res.
				// status(status).json(obj) instead at server.js:60:9
				//res.json(201, post);
				res.status(201).json(post);
			}
		);
	}
);

module.exports = router;
