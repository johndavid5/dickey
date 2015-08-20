/* Implement pub-sub broadcasts common to all
* instances in the cluster using Redis...
*/
var redis = require('redis');
var client = redis.createClient();

var sOuterThis = "pubsub.js";

exports.publish = function(topic, data){ 
	var sWho = sOuterThis + "::" + "publish";
	client.publish(topic, JSON.stringify(data));
};

exports.subscribe = function(topic, callback ){ 

	var sWho = sOuterThis + "::" + "subscribe";

	var client = redis.createClient();

	console.log( sWho + "(): subscribing to topic = '" + topic + "'...");
	client.subscribe(topic);

	client.on('message', function(channel, message){
		console.log( sWho + "(): Got message = ", message, ", on channel = ", channel );
		console.log( sWho + "(): Sending JSON.parse(message) = ", JSON.parse(message), " to the callback()...");
		callback(JSON.parse(message));
	});
};

