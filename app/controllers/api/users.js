var router = require('express').Router();

var bcrypt = require('bcrypt');

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

	bcrypt.hash(req.body.password, 10,
		function(err, hash){
			if(err){
				console.log(sWho + ": Error in bcrypt.hash(): err=", err );
				return next(err);
			}

			user.password = hash;;

			console.log(sWho + ": Saving user = ", user, " to database...");

			user.save(function(err){
				if(err){
					console.log(sWho + ": Error during DB save, err=", err );
					return next(err);
				}

				console.log(sWho + ": DB Save Success, sending code 201 to client...");
				//res.send(201);
				res.status(201).end();
			});
	});

});

router.get('/joe', function(req, res, next){
	var sWho = "controllers/api/users.js GET /api/users/joe";
	console.log(sWho + ": req.route.path = ", req.route.path);
});

module.exports = router;

console.log("*** controllers/api/users.js...");
