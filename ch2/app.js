/**
* Hello, World! Web Server for node.js.
* This responds to any route the web server receives.
*/
var http = require("http");
http.createServer( function(request, response){
	var s_response = "Hello, World!";
	console.log("request = ");
	console.log(request);
	console.log("Sending '" + s_response + "' to the client...\n"); 
	response.writeHead(200, {"Content-Type": "text/plain"});	
	response.write( s_response );
	response.end();
}).listen(3000);

