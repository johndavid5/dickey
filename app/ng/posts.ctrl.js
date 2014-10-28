
// create the PostsCtrl module
// dependency inject $scope
app.controller(
  'PostsCtrl', 
  // The function runs when the "Add Post" button is clicked.
  // NEW!  Dependency inject $http so that Angular will give you
  // an instance of $http in your controller.

  //function($scope, $http){
  function($scope, PostsSvc){

	$scope.addPost = function(){
		if( $scope.postBody ){
				//$http.post('/api/posts', { 
				PostsSvc.create({
					username: 'dickeyxxx',
					body: $scope.postBody
				}).success( function(post){
					$scope.posts.unshift(post); // Unshift new post onto list...
					$scope.postBody = null; // Clear the text field.
				}).error( function(err){
					alert("Trouble posting post: '" + err + "'");
				});
		}
		else {
			alert("Please enter something in the field before clicking on Add Post!");
		}
	};

	// Starting Data
	var b_use_static_data = false;
	if( b_use_static_data ){ 
		$scope.posts = [
			{
				username: 'dickeyxxx',
				body: 'Node rules!'
			},
			{
				username: 'jeffdickey',
				body: 'trying out angular.js...'
			},
		];
	}

	//var node_url = 'http://localhost:3000/api/posts';
	//var node_url = 'http://jayne:3000/api/posts';
	var node_url = '/api/posts';

	console.log("GET-ting posts from '" + node_url + "'...");

	// NEW!  Use posts from server as starting data...
	//$http.get(node_url)
	PostsSvc.fetch()
		.success(function(posts){
			console.log("Got posts from server: posts = ", posts );
			$scope.posts = posts;
		})
		.error(function(err){
			// Cross-Origin Request Blocked: The Same Origin Policy
			// disallows reading the remote resource at
			// http://localhost:3000/api/posts. This can be fixed
			// by moving the resource to the same domain or enabling CORS.
			console.log("Trouble getting posts from '" + node_url + "': err=", err );
			alert("Trouble getting posts from '" + node_url + "': " + err );
		});

  }
);
