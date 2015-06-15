var router = require('express').Router();

//var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('jwt-simple');

var User = require('../../models/user');

var config = require('../../config');

// Authenticate (via token) and get an existing user...
router.get('/', function(req, res, next){

	console.log("./controllers/api/users.js: GET /...");

	if( !req.headers['x-auth']){
		return res.send(401);
	}
	var auth = jwt.decode(req.headers['x-auth'],
				config.secret);

	User.findOne({username: auth.username},
			function(err, user){
				if(err){ return next(err); }	
				res.json(user);
			})
	});

// Create a new user...
router.post('/', function(req, res, next){

	var sWho = "./controllers/api/users.js: POST /";

	console.log(sWho + ": req.body.username = '" + req.body.username + "', req.body.password='" + req.body.password + "'...");

	var user = new User({username: req.body.username});

	var iNumRounds = 10;

	bcrypt.genSalt( iNumRounds, function(err, salt){ 
		if( err ){
			console.log("Trouble with bcrypt.genSalt( iNumRounds = " + iNumRounds + "): err = " + JSON.strinfigy(err) + "..., calling next(err)...");
			return next(err);
		}
		bcrypt.hash( req.body.password, salt, 
				function(){
					//console.log("Making progress, Doc-tor Cy-a-nide...!");
				},
				function(err, hash){
					if( err ){
						console.log("Trouble with bcrypt.hash(): err = " + JSON.stringify(err) + "..., calling next(err)...");
						return next(err);
					}

					var user = new User({"username": req.body.username});

					user.password = hash;

					console.log("Saving new user to User DB, user = " + JSON.stringify( user ) + "...\n");

					user.save(function(err, user){
						if( err ){
							console.log("Trouble with user.save(): err =\n");
							console.log( err );
							return next(err);
						}
						console.log("Saved new user username = \"" + req.body.username + "\"..., returning code 201...\n");
						res.sendStatus(201);
					});

		}); /* bcrypt.hash() */
	}); /* bcrypt.genSalt() */


//	bcrypt.hash(req.body.password, 10,
//		function(err, hash){
//			if(err){
//				console.log(sWho + ": Error in bcrypt.hash(): err=", err );
//				return next(err);
//			}
//
//			user.password = hash;;
//
//			console.log(sWho + ": Saving user = ", user, " to database...");
//
//			user.save(function(err){
//				if(err){
//					console.log(sWho + ": Error during DB save, err=", err );
//					return next(err);
//				}
//
//				console.log(sWho + ": DB Save Success, sending code 201 to client...");
//				//res.send(201);
//				res.status(201).end();
//			});
//	}); /* bcrypt.hash */

});

router.get('/joe', function(req, res, next){
	var sWho = "controllers/api/users.js GET /api/users/joe";
	console.log(sWho + ": req.route.path = ", req.route.path);
});

module.exports = router;

console.log("*** controllers/api/users.js...");
