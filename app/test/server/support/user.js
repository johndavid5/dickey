//var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var config = require('../../../config');
var User = require('../../../models/user');

/*
* In lieu of using the API to register a new user
* and then log in and get a JWT for that user...
* use jsonwebtoken to create a new user and return 
* you their JWT.
*
* Combine code from the "sessions" controller and "users" controller
* to create an authentication shortcut so you can make authenticated
* calls within your tests...
*/
exports.create = function( username, password, callback){
	var user = new User({username: username});

	var iNumRounds = 10;

	bcrypt.genSalt( iNumRounds, function(err, salt){
		if(err){
			return callback(err);
		}
		bcrypt.hash(password, salt,
			function(){
				//console.log("Making progress, Doc-tor Cy-a-nide...!");
			},
			function(err, hash){
				if(err){
					return callback(err);
				}

				user.password = hash;

				user.save(function(err){
					if(err){
						return callback(err);
					}
					user.token = jwt.sign({username: user.username}, config.secret);
					callback(null, user);
				});

			}
		);/* bcrypt.hash() */
	});

	
	//bcrypt.hash(password, 10, function(err, hash){
	//	if(err){
	//		return callback(err);
	//	}
	//
	//	user.password = hash;
	//
	//	user.save(function(err){
	//		if(err){
	//			return callback(err);
	//		}
	//		user.token = jwt.sign({username: user.username}, config.secret);
	//		callback(null, user);
	//	});
	//});
};
