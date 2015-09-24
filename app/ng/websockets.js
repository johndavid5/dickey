// Angular *run* component...simply gets
// executed late in the initialization phase...
angular.module('app')
.run(function($rootScope, $window){

	var sWho = "websockets.js";

	var url = 'ws://localhost:3001';

	if( $window.location.protocol === "https:"){
		url = "wss://" + $window.location.host;
	} else {
		url = "ws://" + $window.location.host;
	}

	console.log(sWho + ": GILLIGAN: WebSocket connecting to '" + url + "', Skipper...");

	var connection = new WebSocket(url);

	connection.onopen = function(){
		console.log(sWho + ': GILLIGAN: WebSocket connected, Skipper...');
	};

	// Publish the incoming message to $rootScope,
	// which any controller or service
	// can listen to with $scope.$on()...
	connection.onmessage = function(e){
		console.log(sWho + ": GILLIGAN: WebSocket message received, Skipper: ", e );
		var payload = JSON.parse(e.data);
		console.log(sWho + ": GILLIGAN: payload = ", payload );
		console.log(sWho + ": GILLIGAN: Doing \$rootScope.\$broadcast('ws:' + payload.topic, payload.data ), Skipper..."); 
		$rootScope.$broadcast('ws:' + payload.topic, payload.data);
	};
});
