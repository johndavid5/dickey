var express = require('express');
// JSON Web Token (JWT) - pronounced "jot"
var jwt = require('jwt-simple');

var app = express();
app.use(require('body-parser').json())

var secretKey = 'supersecretkey';

app.post('/session', function(req, res){
	var our_username = req.body.username;

	// TODO: Validate password
	var token = jwt.encode({"username": our_username}, secretKey );

	console.log("*** POST /session: our_username = ", our_username, " new token = ", token ); 

	res.json(token);
});

app.get('/user', function(req, res){
	var token = req.headers['x-auth'];
	var user = jwt.decode(token, secretKey);
	console.log("*** GET /user: token = ", token, " user = ", user ); 
	// TODO: pull user info from database
	res.json(user);
});

var i_port = 3000;
console.log("*** Listening on port " + i_port + "...");
app.listen( i_port );
