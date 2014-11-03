var User = require('./user'); // Mongoose model for "User"... 

var bcrypt = require('bcrypt');

var express = require('express');
// JSON Web Token (JWT) - pronounced "jot"
var jwt = require('jwt-simple');
var app = express();
app.use(require('body-parser').json())

var _ = require('lodash'); // Alternative to underscore.js

//var g_users = [{username: 'dickeyxxx', password: 'pass'}];

var g_secretKey = 'supersecretkey';

//var findUserByUsername = function(our_username){
//	return _.find(g_users, {"username": our_username});
//};

//var validateUser = function(user, password){
//	return (user.password === password); 
//};

// Create new user...
app.post('/user', function(req, res, next){

	var user = new User({username: req.body.username});	

	console.log("POST /user: Creating new user '" + req.body.username + "' in DB...");

	bcrypt.hash(req.body.password, 10, function(err, hash){
		user.password = hash;
		user.save(function(err, user){
			if(err){
				console.log("POST /user: Trouble creating new user '" + req.body.username + "' in DB: ", err);
				throw next(err);
			}
			console.log("POST /user: Creating new user '" + req.body.username + "' successful, sending code 201 to client...");
			// Sat, 01 Nov 2014 21:36:05 GMT express deprecated
			// res.send(status): Use res.sendStatus(status) instead
			// at server.js:40:8
			//res.send(201);
			res.sendStatus(201);
		});
	});

});

app.post('/session', function(req, res, next){

	console.log("*** POST /session: req.body.username = '" + req.body.username + "', req.body.password = '" + req.body.password + "'...");

	// Look up req.body.username in MondoDb,
	// then validate...
	User.findOne({username: req.body.username})
	.select('password') // explicitly ask for password
	.exec(function(err, user){
			if(err){
				console.log("Trouble looking up username '" + req.body.username + "' in model, err=" , err );
				return next(err);
			}

			if( !user ){
				//return res.send(401);
				console.log("username '" + req.body.username + "' not found in model, returning code 401...");
				return res.sendStatus(401);
			}

			bcrypt.compare(req.body.password,
				user.password, function(err, valid){
					if(err){
						console.log("Trouble with bcrypt.compare req.body.password, err=" , err );
						return next(err);
					}
					if(!valid){
						console.log("username '" + req.body.username + "' supplied invalid password, returning code 401 (unauthorized)...");
						//return res.send(401);
						return res.sendStatus(401);
					}
					var token = jwt.encode({username: user.username},
										g_secretKey);

					console.log("*** POST /session: username = ", req.body.username, " password valid, sending token = ", token, " to client..."); 
					res.json(token);
				});
		});
});

app.get('/user', function(req, res){
	var token = req.headers['x-auth'];
	var auth = jwt.decode(token, g_secretKey);
	console.log("*** GET /user: From token = ", token, " => auth = ", auth ); 

	console.log("*** GET /user: Looking up auth.username = '" + auth.username + "' in database...");

	var found_user = false;

	// Pull user info from database
	User.findOne({username: auth.username},
		function(err, user){
			found_user = true;
			console.log("*** GET /user: returning looked up user = ", user, " to client...");
			res.json(user);
	});

	if( ! found_user ){
		console.log("*** GET /user: Couldn't find auth.username = '" + auth.username + "' in database...?");
	}

});

var i_port = 3000;
console.log("*** Listening on port " + i_port + "...");
app.listen( i_port );
