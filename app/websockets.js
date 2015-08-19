var _ = require('lodash');
var ws = require('ws');
var clients = []; // Keep track of all client sockets...

/**
* Define function connect() that adds WebSockets to a Node server.
* When a client connects to a WebSocket, the connection event will
* be called.  You then send a message directly to that new client
* to say "hello!".
*/
exports.connect = function(server){

	var wss = new ws.Server({"server": server});

	wss.on('connection', function(ws){
		console.log("Websocket connected...");
		ws.send("Welcome back, John...so glad you could make it...\n");

		// Add this socket to our list of client sockets...
		clients.push(ws);

		exports.broadcast("A new client has joined us...", "I'll be back, Bennett!");

		ws.on('close', function(){
			console.log("Websocket closed...");
			_.remove(clients, ws);
			exports.broadcast("A client has left us...", "Let off some steam, Bennett!");
		});
	});
};/* exports.connect = function(server) */

/**
* Broadcast a message to all clients.
*/
exports.broadcast = function( topic, data ){
	var json = JSON.stringify({"topic": topic, "data": data});
	clients.forEach(function(client){
		client.send(json);
	});
};
