//var JUtils = require('../../lib/jutils.js');
require('../../lib/jutils.js');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var Post = require('./models/post');	

app.get('/api/posts',
	function(req, res, next){
		console.log( "[" + JUtils.dateTimeCompact() + "]: " +
		"Got request on '/api/posts'..."
		);

		Post.find( function(err, posts){		
			if(err){
				console.log('Error during Post.find: err = ', err );
				return next(err);
			}

			console.log('Post.find successful; sending posts to client, posts =', posts);
			res.json(posts);
		});

		//res.json([
		//	{
		//		username: 'dickeyxxx',
		//		body: 'node rocks...kinda...!'
		//	}
		//]);
	}
);


app.post('/api/posts',
	function(req, res, next){
		console.log( "[" + JUtils.dateTimeCompact() + "]: " +
		"Got POST request on '/api/posts'..."
		);
		//console.log( "[" + JUtils.dateTimeCompact() + "]: " +
		//"req = ", req
		//);
		console.log('post received!');
		console.log("req.body = ", req.body );
		console.log("req.body.username = '" + req.body.username + "'...");
		console.log("req.body.body = '" + req.body.body + "'...");

		// Build a new instance of the Post model...
		var post = new Post({		
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

app.get('/*',
	function(req, res){
		s_output = "Hello, World!";
		var date = new Date;
		console.log( "[" + JUtils.dateTimeCompact() + "]: " +
		"Got GET request on '/*': " + req.method + " " + req.url + "...\n");
	   	//console.log("req = ", req);
		res.status(200).send(s_output);
	}
);

var le_port = 3000;

app.listen(le_port,
	function(){
		console.log( "[" + JUtils.dateTimeCompact() + "]: " +
		'Server listening on port ', le_port, "...");
	}
);
	
