// Angular *run* component...simply gets
// executed late in the initialization phase...
angular.module('app')
.run(function($rootScope){

	var url = 'ws://localhost:3001';

	var connection = new WebSocket(url);

	connection.onopen = function(){
		console.log('GILLIGAN: WebSocket connected, Skipper...');
	};

	// Publish the incoming message to $rootScope,
	// which any controller or service
	// can listen to with $scope.$on()...
	connection.onmessage = function(e){
		console.log("GILLIGAN: WebSocket message received, Skipper: ", e );
		var payload = JSON.parse(e.data);
		console.log("GILLIGAN: payload = ", payload );
		$rootScope.$broadcast('ws:' + payload.topic, payload.data);
	};
});
