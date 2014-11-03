angular.module('app')
.service('UserSvc', function($http){

	var svc = this;

	svc.getUser = function(){
		//return $http.get('/api/users', {
		//	headers: {'X-Auth': this.token }
		//});

		return $http.get('/api/users');
	};

	// Two Step Login Process:
	// 1st: Call POST /api/sessions to get a JWT
	//   (JSON Web Token or "jot" for authentication)
	// 2nd: Call GET /api/users to get the currently
	//   logged-in user's information. 
	svc.login = function(username, password){
		return $http.post('/api/sessions', {
			username: username, password: password
		}).then( function(val){
			svc.token = val.data;
			// NEW!  All request will have the authorization
			// header attached...
			$http.defaults.headers.common['X-Auth'] = val.data;
			return svc.getUser();
		});
	};
});
