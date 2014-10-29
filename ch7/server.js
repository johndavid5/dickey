var express = require('express');
// JSON Web Token (JWT) - pronounced "jot"
var jwt = require('jwt-simple');
var app = express();
app.use(require('body-parser').json())

var _ = require('lodash'); // Alternative to underscore.js

var g_users = [{username: 'dickeyxxx', password: 'pass'}];

var g_secretKey = 'supersecretkey';

var findUserByUsername = function(our_username){
	return _.find(g_users, {"username": our_username});
};

var validateUser = function(user, password){
	return (user.password === password); 
};

app.post('/session', function(req, res){

	console.log("*** POST /session: req.body.username = '" + req.body.username + "', req.body.password = '" + req.body.password + "'...");

	// Validate password...
	var user = findUserByUsername(req.body.username);
	if( ! validateUser( user, req.body.password ) ){
		console.log("*** POST /session: Wrong password!  Sending code 401 - Unauthorized to client...");
		// Tue, 28 Oct 2014 17:51:13 GMT express deprecated
		// res.send(status): Use res.sendStatus(status)
		// instead at server.js:29:14
		//return res.send(401); // Unauthorized!
		return res.sendStatus(401); // Unauthorized!
	}

	var token = jwt.encode({"username": user.username}, g_secretKey );

	console.log("*** POST /session: username = ", req.body.username, " sending new token = ", token, " to client..."); 

	res.json(token);
});

app.get('/user', function(req, res){
	var token = req.headers['x-auth'];
	var user = jwt.decode(token, g_secretKey);
	console.log("*** GET /user: From token = ", token, " => user = ", user ); 
	// TODO: pull user info from database
	res.json(user);
});

var i_port = 3000;
console.log("*** Listening on port " + i_port + "...");
app.listen( i_port );
