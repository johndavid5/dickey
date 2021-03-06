var jutils = require('../lib/jutils.js');
var express = require('express');
//var bodyParser = require('body-parser');

require('./consolador'); // Override console.log() to prepend (<pid>) to message...
var logger = require('./logger');

var websockets = require('./websockets');

var app = express();
app.use(require('./controllers')); // Use new root router object defined in ./controllers/index.js...

//app.use(bodyParser.json());

//app.use(require('./auth')); // Pull in "auth" middleware...

//app.use('/api/posts', require('./controllers/api/posts'));
//app.use('/api/users', require('./controllers/api/users'));
//app.use('/api/sessions', require('./controllers/api/sessions'));
//app.use('/', require('./controllers/static'));

// Allow to listen on port specified in environmental variable,
// otherwise default to port 3001...this way Protractor can
// start server on alternate port and prevent clash with
// server running on port 3001...
var le_port = process.env.PORT || 3001;

var server = app.listen(le_port,
	function(){
		console.log( "[" + jutils.dateTimeCompact() + "]: " +
		'Server listening on port ', le_port, "...");
	}
);

websockets.connect(server);
	
