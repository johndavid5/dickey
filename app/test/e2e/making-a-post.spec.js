var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

// It's important the tests end in .spec.js since that's how you will tell
// Protractor to find the tests.  It will also allow us to have .js files in the
// test/e2e directory that are not tests -- such as utility scripts.
// Mocha (much like Jasmine or RSpec) uses BDD-style 'describe' and 'it' blocks...
describe('making a post', function(){
	it('logs in and creates a new post', function()
	{
		this.timeout(1000000000);

		var sleep_time = 30000;

		// go to homepage...
		//browser.get('http://localhost:3002');
		browser.get('http://localhost:3001');

		//browser.pause(); // Pause so you can see it...
		//console.log("Sleeping for " + sleep_time + " milliseconds...");
		//browser.sleep(sleep_time); // Pause so you can see it...
		//browser.debugger();

		// click 'login'...
		element(by.css('nav .login')).click();

		//console.log("Sleeping for " + sleep_time + " milliseconds...");
		//browser.sleep(sleep_time); // Pause so you can see it...

		// fill out and submit login form...
		element(by.model('username')).clear();
		element(by.model('username')).sendKeys('arnie');
		//element(by.model('username')).sendKeys('cindy');

		element(by.model('password')).clear();
		element(by.model('password')).sendKeys('pass');

		//element(by.css('form .btn')).click();
		element(by.id('login_button')).click();

		//console.log("Are we logged in...?");
		//console.log("Sleeping for " + sleep_time + " milliseconds...");
		//browser.sleep(sleep_time); // Pause so you can see it...also give time for reply...

		// click 'posts'...
		element(by.css('nav .posts')).click();

		// submit a new post on the posts page...
		//var post = "Let off some posts, Bennett!";
		//var post = "Yes, and people are using her to force me to do a job...";
		//var post = "...If I don't get to her soon, they'll kill her...!";
		//var post = "Well, did you do the job...?";
		//var post = "No, I know they will kill her even if I did it...";
		//var post = "My only chance now is to get to her before they know what I'm doing...";
		var post = "All that matters to me now is Chennie...";

		element(by.model('postBody')).sendKeys(post);
		//element(by.css('form .btn')).click();
		element(by.id('add_post_button')).click();

		// confirm that new post from top of the list is the post we just posted to it...
		element.all(by.css('ul.list-group li')).first().getText()
		.then( function(text){
			console.log(
			"\n" +
			"*** NEW POST FROM TOP OF THE LIST ***\n" +
			text + "\n" +
			"*************************************"	
			);	
			expect(text).to.contain(post);
		});

		expect(element.all(by.css('ul.list-group li')).first().getText()).to.eventually.contain(post);

		console.log("Hasta la vista, Baby...!");
		
		// the user should now see their post
		// as the first post on the page.
	});
});


// @cindy Is this your daughter? 2015-09-01T22:30:33.966Z
// @arnie Let off some steam, Bennett 2015-08-31T22:52:48.829Z
// @kirby I just want you to start your old unit again, John, all it would take is your coming back... 2015-08-31T20:50:25.946Z
// @arnie Just bodies! 2015-08-31T20:43:23.704Z
// @kirby Leave anything for us? 2015-08-31T20:43:08.723Z
// @kirby John, come on out! It's Kirby! 2015-08-31T20:34:45.492Z
// @kirby leave anything for us? 2015-08-31T20:32:33.436Z
// @cindy I read the instructions! 2015-08-31T20:28:38.894Z
// @arnie No chance! 2015-08-31T20:14:56.003Z
// @arnie just bodies...! 2015-08-20T17:44:38.817Z
// @kirby leave anything for us? 2015-08-20T17:44:20.278Z
// @bennett Welcome back, John...so glad you could make it... 2015-08-20T17:43:28.736Z
// @arnie maintenant j'ai un... 2015-08-20T00:11:38.954Z
// @cindy maintenant vous n'avez plus de voiture 2015-08-19T23:47:28.384Z
// @arnie faux! 2015-08-19T23:46:39.934Z
// @arnie We'll take Cook's car...he won't be needing it... 2015-08-18T23:57:35.419Z
//
