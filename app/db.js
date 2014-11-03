// Base Database Connection Logic
var mongoose = require('mongoose');

var url = 'mongodb://localhost/social';

console.log("db.js: Connecting to '" + url + "'...");
mongoose.connect( url, 
	function(){
		console.log('mongodb connected...');
	}
);
console.log("db.js: Done connecting to '" + url + "'...");

module.exports = mongoose;
