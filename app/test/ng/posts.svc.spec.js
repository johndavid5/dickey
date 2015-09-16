describe('posts.svc', function(){
	beforeEach(module('app'))

		var PostsSvc, $httpBackend;

		var samplePosts = [
			{username: "arnie", body: "I'll be back, Bennett!"},
			{username: "bennett", body: "John...I'll be ready, John..."},
			{username: "bennett", body: "Welcome back, John, so glad you could make it..."},
		];

		beforeEach(inject(function(_PostsSvc_, _$httpBackend_){
			PostsSvc = _PostsSvc_;
			console.log("STEED: PostsSvc has been dependency injected into our little test suite, Mis-sus Peel:", PostsSvc, "\n", "How does she look, old girl...?" );

			$httpBackend = _$httpBackend_;
			console.log("STEED: $httpBackend has been dependency injected into our little test suite, Mis-sus Peel:", $httpBackend, "\n", "How does she look, old girl...?" );
		}));

		afterEach(function(){
			console.log("STEED: Just flush()-ing $httpBackend, Missus Peel...");
			$httpBackend.flush();
		});

		/*
		describe('#fetch-exists', function(){
			it('exists', function(){
				console.log("STEED: Just seeing if PostsSvc.fetch exists, Mis-sus Peel...");
				expect(PostsSvc.fetch).to.exist;
			});
		});
		*/

		describe('#fetch', function(){

			console.log("STEED: Just stubbing out the call to /api/posts, Mis-sus Peel...");

			beforeEach(function(){
				$httpBackend.expect('GET', '/api/posts')
				.respond( samplePosts );
			});

			it('gets ' + samplePosts.length + ' posts', function(){

				console.log("STEED: Just checking to see if PostsSvc.fetch() returns " +
					samplePosts.length + " post" + (samplePosts.length == 1?"":"s") + ", Mis-sus Peel...");

				PostsSvc.fetch().success(function(posts){
					console.log("STEED: For your information, posts.length = " + posts.length + ", Mis-sus Peel..." );
					expect(posts).to.have.length(samplePosts.length);
				});
			});
		});

});
