var db = require('../db');

var user = db.Schema({
	username: {type: String, required: true },
	// Password doesn't get sent to caller
	// unless explicitly select()-ed...
	password: {type: String, required: true, select: false}
});

module.exports = db.model('User', user);

