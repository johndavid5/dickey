var jutils = require(__dirname + '/../../lib/jutils');
var express = require('express');
var router = require('express').Router();

// Use Express's middleware to allow serving of static assets.
// Allows us to access "../assets/app.js" as simply "/app.js" in the client.
router.use(express.static(__dirname + '/../assets'));


// Serve up the static bootstrap HTML page...
// app.get('/', function(req, res){
router.get('/', function(req, res){
	// Wed, 22 Oct 2014 23:24:46 GMT
	// express deprecated res.sendfile: Use res.sendFile
	// instead at server.js:12:6
	//
	// TypeError: path must be absolute or specify root to res.sendFile
    // at ServerResponse.sendFile
	// (c:\inetpub\wwwroot\dickey\app\node\node_modules\
	// express\lib\response.js:389:11)
	//res.sendFile('layouts/posts.html');

	res.sendfile('layouts/posts.html');
});

//app.get('/*',
//router.get('/*',
//	function(req, res){
//		s_output = "Hello, World!";
//		var date = new Date;
//		console.log( "[" + jutils.dateTimeCompact() + "]: " +
//		"Got GET request on '/*': " + req.method + " " + req.url + "...\n");
//	   	//console.log("req = ", req);
//		res.status(200).send(s_output);
//	}
//);


module.exports = router;
