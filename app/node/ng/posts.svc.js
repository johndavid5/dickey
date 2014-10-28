// Break Angular into Services:
//
// Avoid having $http inside the controller.
// Define the 'PostsSvc' service on the app object...
// ...and dependency inject $http
// ...then define a function on the service
// called fetch() that returns the $http promise
// for loading posts.
app.service( 'PostsSvc', function($http){
	this.fetch = function(){
		return $http.get('/api/posts');
	};
	this.create = function(post){
		return $http.post('/api/posts', post);	
	};
});

//console.error('faux error!');
