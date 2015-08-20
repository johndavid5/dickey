var jutils = require('./jutils');

function commifyTest(){ 

	var sWho = "commifyTest";

	var inputs = [
		.876,
		.87,
		.8,
		0,
		1,
		12,
		123,
		1234,
		12345,
		123456,
		1234567,
		12345678,
		"12345678.",
		12345678.0,
		123456789,
		123456789.,
		123456789.8,
		123456789.87,
		123456789.876,
		123456789.8765,
	];

	//jutils.debug = 1;

	for (var i = 0; i < inputs.length; i++ ){
		console.log( sWho + "(): [" + i + "]: jutils.commify( '" + inputs[i] + "' ) = '" + jutils.commify( inputs[i] ) + "'...");
	}

	console.log("Let off some commas, Bennett!");
	console.log("Let off some steam, Bennett!");
}/* commifyTest() */

commifyTest();
