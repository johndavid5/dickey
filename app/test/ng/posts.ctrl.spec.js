describe('posts.ctrl', function(){

	beforeEach(module('app'));

	var $scope;

	var sWho = "posts.ctrl.spec.js";
	
	// Create an empty mockPostsSvc object, then
	// add the stubbed methods in the 'beforeEach'
	// filter below...
	var mockPostsSvc = {};

	beforeEach(inject(function($q) {
		mockPostsSvc.fetch = function(){

			console.log(sWho + ": CURLY: Let's make a mockPostsSvc, Moe...!");

			var deferred = $q.defer();

			deferred.resolve({data: [	
				{username: 'arnie', body: 'I\'ll be back, Bennett!'},
				{username: 'arnie', body: 'Let off some steam, Bennett!'},
			]});

			return deferred.promise;
		}

    	mockPostsSvc.create = function () {
			var deferred = $q.defer()
			deferred.resolve()
			return deferred.promise
		}	
	}));

	beforeEach(inject(function($rootScope, $controller){
			$scope = $rootScope.$new();
			$controller('PostsCtrl', {
				$scope: $scope,
				PostsSvc: mockPostsSvc,
			});
		})
	);

	it('loads posts form the service', function(){
		console.log(sWho + ": STEED: BEFORE FLUSH: \$scope.posts = ", $scope.posts, ", Mis-sus Peel...");
		console.log(sWho + ": STEED: Calling $scope.$digest() to flush the $digest events, Mis-sus Peel...");
    	$scope.$digest();
		console.log(sWho + ": STEED: AFTER FLUSH: \$scope.posts = ", $scope.posts, ", Mis-sus Peel...");
		console.log(sWho + ": STEED: Just checking to see if $scope.posts has length of 2, Mis-sus Peel..."); 
		expect($scope.posts).to.have.length(2);
	});

	it('sends a new post to the service', function(){

		sinon.spy(mockPostsSvc, 'create');	

		var le_post = {body: 'You should not drink...and bake.', username: 'dickeyxxx'};

		$scope.postBody = le_post.body;
		console.log(sWho + ": STEED: 'sends a new post to the service': Doing $scope.addPost(), Mis-sus Peel...");
		$scope.addPost();
		console.log(sWho + ": STEED: 'sends a new post to the service': spying on mockPostsSvc.create()...should have been calledWith(" , le_post , "), Mis-sus Peel...");
		expect(mockPostsSvc.create).to.have.been.calledWith(le_post);
	});
	
});
