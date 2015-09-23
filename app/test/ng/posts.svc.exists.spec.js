describe('posts.svc.exists', function(){

	beforeEach(module('app'));

	var PostsSvc;

	var sWho = "posts.svc.exists.spec.js";

	beforeEach(inject(function(_PostsSvc_){
		// Use dependency injection to provide you with an instance of PostsSvc...
		console.log(sWho + ": STEED: Just dependency injecting PostsSvc, Mis-sus Peel...");
		PostsSvc = _PostsSvc_;
	}));

	describe('#fetch-exists', function(){
		it('exists', function(){
			console.log(sWho + ": STEED: Just seeing if PostsSvc.fetch exists, Mis-sus Peel...");
			expect(PostsSvc.fetch).to.exist;
		});
	});

});
