angular.module('app')
.controller('LoginCtrl', function($scope, UserSvc){

	$scope.DEFAULT_PASSWORD = "pass";
	$scope.password = $scope.DEFAULT_PASSWORD;

	$scope.login = function(username, password){
		UserSvc.login(username, password)
		//.then(function(user){
		//	console.log("* ./ng/login.ctrl.js: login of user = ", user);
		//})
		.then(function(response){
			$scope.$emit('login', response.data);
		});
	};
});
