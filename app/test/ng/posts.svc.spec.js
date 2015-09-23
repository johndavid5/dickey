describe('posts.svc', function(){

	var sWho = "posts.svc.spec.js";

	beforeEach(module('app'))

		var PostsSvc, $httpBackend;

		var samplePosts = [
			{username: "arnie", body: "I'll be back, Bennett!"},
			{username: "bennett", body: "John...I'll be ready, John..."},
			{username: "bennett", body: "Welcome back, John, so glad you could make it..."},
		];

		beforeEach(inject(function(_PostsSvc_, _$httpBackend_){

			PostsSvc = _PostsSvc_;

			console.log(sWho + "(): STEED: PostsSvc has been dependency injected into our little test suite, Mis-sus Peel:", PostsSvc, "\n", "How does she look, old girl...?" );

			$httpBackend = _$httpBackend_;
			console.log(sWho + "(): STEED: $httpBackend has been dependency injected into our little test suite, Mis-sus Peel:", $httpBackend, "\n", "How does she look, old girl...?" );
		}));

		afterEach(function(){
			console.log(sWho + "(): STEED: Just flush()-ing $httpBackend, Missus Peel...");
			$httpBackend.flush();
		});

		describe('#fetch', function(){

			console.log(sWho + "(): STEED: Just stubbing out the call to /api/posts, Mis-sus Peel...");

			beforeEach(function(){
				$httpBackend.expect('GET', '/api/posts')
				.respond( samplePosts );
			});

			it('gets ' + samplePosts.length + ' posts', function(){

				console.log(sWho + "(): STEED: Just checking to see if PostsSvc.fetch() returns " +
					samplePosts.length + " post" + (samplePosts.length == 1?"":"s") + ", Mis-sus Peel...");

				PostsSvc.fetch().success(function(posts){
					console.log(sWho + "(): STEED: For your information, posts.length = " + posts.length + ", Mis-sus Peel..." );
					expect(posts).to.have.length(samplePosts.length);
				});
			});
		});

});
