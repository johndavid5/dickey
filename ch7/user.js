// Create a user model with Mongoose...
var mongoose = require('mongoose');

var url = 'mongodb://localhost/auth_demo';

console.log("user.js: Calling mongoose.connect('" + url + "')...");
mongoose.connect('mongodb://localhost/auth_demo');

var user = mongoose.Schema({
	username: String,
	//password: String
	// By default, do not supply bcrypted password...
	// callee must explicitly select() it...
	password: {type: String, select: false}
});

module.exports = mongoose.model('User', user); 
