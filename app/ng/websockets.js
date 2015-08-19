// Angular *run* component...simply gets
// executed late in the initialization phase...
angular.module('app')
.run(function($rootScope){
	var url = 'ws://localhost:3001';
	var connection = new WebSocket(url);

	connection.onopen = function(){
		console.log('GILLIGAN: WebSocket connected, Skipper...');
	}
}
