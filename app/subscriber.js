var zmq = require('zmq')
var subscriber = zmq.socket('sub')

var sWho = "subscriber.js";

var sub_address = "tcp://localhost:8688";

subscribe = function(topic, callback){

	console.log(sWho + ": Listening on '" + sub_address + "'...");	
	subscriber.connect(sub_address);
	subscriber.subscribe("")

	subscriber.on("message", function(reply) {
	  console.log(sWho + ': Received message: ', reply.toString());
	  callback( reply );
	  //var leSendee = JSON.parse(reply);
	  //console.log(sWho + ": Sending JSON.parse(reply) = ", leSendee, " to callback()...");
	  //callback( leSendee );
	});
}

module.exports = subscribe;

process.on('SIGINT', function() {
  subscriber.close()
  console.log('\n' + sWho + ': Closed')
})

