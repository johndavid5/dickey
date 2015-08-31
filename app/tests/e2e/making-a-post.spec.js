// It's important the tests end in .spec.js since that's how you will tell
// Protractor to find the tests.  It will also allow us to have .js files in the
// test/e2e directory that are not tests -- such as utility scripts.
// Mocha (much like Jasmine or RSpec) uses BDD-style 'describe' and 'it' blocks...
describe('making a post', function(){
	it('logs in and creates a new post', function()
	{
		// go to homepage...
		browser.get('http://localhost:3000');

		// click 'login'...
		
		// submit a new post on the posts page...
		
		// the user should now see their post as the first post on the page.
	});
});
