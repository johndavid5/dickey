describe('posts.ctrl', function(){

	beforeEach(module('app'));

	var $scope;

	beforeEach(inject(function($rootScope, $controller){
			$scope = $rootScope.$new();
			$controller('PostsCtrl', {
				$scope: $scope
			});
		})
	);

	it('loads posts form the service', function(){
		console.log("STEED: Just checking to see if $scope.posts has length of 2, Mis-sus Peel..."); 
		expect($scope.posts).to.have.length(2);
	});
	
});
