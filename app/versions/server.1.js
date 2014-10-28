//var JUtils = require('../../lib/jutils.js');
require('../../lib/jutils.js');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/api/posts',
	function(req, res){
		console.log( "[" + JUtils.dateTimeCompact() + "]: " +
		"Got request on '/api/posts'..."
		);
		res.json([
			{
				username: 'dickeyxxx',
				body: 'node rocks...kinda...!'
			}
		]);
	}
);

app.post('/api/posts',
	function(req, res){
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
		// Tue, 21 Oct 2014 17:51:26 GMT express deprecated
		// res.send(status): Use res.status(status).end()
		// instead at server.js:35:7
		//res.send(201);
		res.status(201).end();
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
	
