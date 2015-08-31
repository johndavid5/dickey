var zmq = require('zmq');
var publisher = zmq.socket('pub');

var pub_address = 'tcp://*:8688';

var sWho = "publisher.js";

publisher.bind(pub_address, function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log(sWho + "(): Listening on '" + pub_address + "'...");
	}
});

publish = function(topic, data){
  var sMsg = topic + "|" + data;
  console.log(sWho + "(): Sending '" + sMsg + "'...");
  publisher.send( sMsg );
}

module.exports = publish;

process.on('SIGINT', function() {
  publisher.close()
  console.log('\n' + sWho + ': Closed')
})
