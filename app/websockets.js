var ws = require('ws');

exports.connect = function(server){
	var wss = new ws.Server({"server": server});
	wss.on('connection', function(ws){
		console.log("Websocket connected...");
		ws.send("I'll be back, Bennett!");
	});
};/* exports.connect = function(server) */
