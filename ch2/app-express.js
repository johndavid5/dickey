// http://www.bennadel.com/blog/2169-where-does-node-js-and-require-look-for-modules.htm
//var express = require('express');
var express = require("C:\\Users\\john.aynedjian\\AppData\\Roaming\\npm\\node_modules\\express");

var app = express();

app.get('/', function(req, res){
	var s_output = "Hello, World!";
	console.log("route=\/, sending '" + s_output + "'...\n");
	// Fri, 17 Oct 2014 21:21:11 GMT express deprecated res.send(status, body): Use res
	// .status(status).send(body) instead at app-express.js:9:6
	//res.send(200, s_output);
	res.status(200).send(s_output);
});

app.get('/index', function(req, res){
	var s_output = "Hello, Index!";
	console.log("route=\/index, sending '" + s_output + "'...\n");
	//res.send(200, s_output);
	res.status(200).send(s_output);
});

app.get('/*', function(req, res){
	var s_output = "Hello, Wildcard!";
	console.log("route=\/*, sending '" + s_output + "'...\n");
	//res.send(200, s_output);
	res.status(200).send(s_output);
});

app.listen(8888);
