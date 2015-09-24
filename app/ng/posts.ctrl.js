// create the PostsCtrl module
// dependency inject $scope
//app.controller(
angular.module('app').controller( 'PostsCtrl', 
  // The function runs when the "Add Post" button is clicked.
  // NEW!  Dependency inject $http so that Angular will give you
  // an instance of $http in your controller.

  function($scope, PostsSvc){

	var sWho = "posts.ctrl.js";

	$scope.addPost = function(){

		if( $scope.postBody ){
				PostsSvc.create({
					username: 'dickeyxxx',
					body: $scope.postBody
				//}).success( function(post){
				}).then( function(post){
					// No longer necessary to un-shift new post onto our list, we'll 
					// now be listening for ALL new posts via web sockets...
					//$scope.posts.unshift(post); // Unshift new post onto list...
					$scope.postBody = null; // Clear the text field.
				},
				function(err){
					console("Trouble posting post: err = '", err, "'");
					alert("Trouble posting post: '", err, "'");
				}
				);
				//.error( function(err){
				//	alert("Trouble posting post: '" + err + "'");
				//});
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

	console.log(sWho + ": GET-ting posts from '" + node_url + "'...");

	// NEW!  Use posts from server as starting data...
	PostsSvc.fetch()
		//.success(function(posts)
		.then(function(response){

			var data = response.data,
	        status = response.status,
			header = response.header,
			config = response.config;

			console.log(sWho + ": Got posts from server: response = ", response );
			console.log(sWho + ": Got posts from server: data = ", data );
			console.log(sWho + ": Got posts from server: status = ", status );
			console.log(sWho + ": Got posts from server: header = ", header );
			console.log(sWho + ": Got posts from server: config = ", config );

			if( data ){
				$scope.posts = data;
			}
			else{
				$scope.posts = response;
			}

			//$scope.posts = posts;
		},
		function(err){
			// Cross-Origin Request Blocked: The Same Origin Policy
			// disallows reading the remote resource at
			// http://localhost:3000/api/posts. This can be fixed
			// by moving the resource to the same domain or enabling CORS.
			console.log("Trouble getting posts from '" + node_url + "': err=", err );
			alert("Trouble getting posts from '" + node_url + "': ", err );
		}
		);
		//.error(function(err)
			// Cross-Origin Request Blocked: The Same Origin Policy
			// disallows reading the remote resource at
			// http://localhost:3000/api/posts. This can be fixed
			// by moving the resource to the same domain or enabling CORS.
			//console.log("Trouble getting posts from '" + node_url + "': err=", err );
			//alert("Trouble getting posts from '" + node_url + "': " + err );
		//});

	// Listen for new posts broadcast over $routeScope.
	$scope.$on('ws:new_post', function(_, post){
		var sWho = "$scope.$on('ws:new_post')";
		console.log(sWho + "SHEMP: Hey, Moe: _ = ", _ , ", post = ", post , "...");
		// I’m not sure why $ scope. $ apply() is necessary here, but without it
		// the UI won’t update. I think that $scope.$on should be triggering a
		// digest cycle, so it may be an Angular bug. Regardless, adding $scope.$apply()
		// solves the issue. Dickey, page 134
		$scope.$apply( function() {
			$scope.posts.unshift( post );
		});
	});

  }/* function($scope, PostsSvc) */

);/* angular.module('app').controller */
