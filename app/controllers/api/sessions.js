var router = require('express').Router();

var User = require('../../models/user');

//var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('jwt-simple');

var config = require('../../config');

router.post('/', function( req, res, next ){

	console.log("In ./sessions.js/post()...req.body.username=\"" + req.body.username + "\"...\n");

	var finder = {username: req.body.username};

	console.log("Calling User.findOne(", finder , ")...");

	User.findOne(finder)
	.select('password')
	.select('username')
	.exec(function(err, user){

		if(err){
			console.log("Got err = ", err, "...calling next(err)...");
			return next(err);
		}

		if(!user){
			console.log("Got user null or undefined, returning HTTP code 401...");
			//return res.send(401);
			return res.status(401).end();
		}

		console.log("Got user = ", user, "...doing bcrypt.compare(req.body.password=\""+req.body.password+"\", user.password=\"" + user.password + ")...");

		bcrypt.compare(req.body.password, 
			user.password,
			function(err, valid){

				if(err){
					console.log("Got err = ", err, "returning next(err)...");
					return next(err);
				}

				if(!valid){
					console.log("Got valid != TRUE, sending HTTP code 401...");
					return res.send(401);
				}

				console.log("Calling token = jwt.encode( {username: user.username = \"" + user.username + "\"}, config.secret = \"" + config.secret + "\"...");

				var token = jwt.encode({username: user.username}, config.secret);

				console.log("Returning token = \"" + token + "\" on response...");

				res.send(token);
			})
	})
});

module.exports = router;
