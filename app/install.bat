npm install --save express
npm install --save body-parser
npm install --save mongoose
npm install --global nodemon
npm install --global gulp
npm install --save gulp
npm install --save gulp-concat
npm install --save gulp-uglify
npm install --save gulp-ng-annotate
npm install --save gulp-sourcemaps

REM Johnny's Addition...allows command-line stuff
REM to be run from gulp...
npm install --save gulp-run
REM Johnny's Addition...
npm install --save dos2unix

npm install --save gulp-stylus
npm install --save gulp-nodemon

npm install --save gulp-debug
npm install --save gulp-tap

npm install --save jwt-simple

REM Forget about bcrypt...use bcrypt-nodejs instead...
npm install --save bcrypt-nodejs
REM npm install --save bcrypt
REM npm uninstall --save bcrypt

REM web sockets for node,
REM also install globally so
REM we can use "wscat" from
REM the command line...
npm install --save ws
npm install --global ws
npm install --global wscat

REM Using lo-dash in websocket.js
npm install --save lodash



REM NOTE: Needed to do rm -r -f node_modules/bcrypt then
REM "sudo npm update" to reinstall bcrypt and eliminate
REM the following error:
REM /home/john/projects/mean/dickey/app/node_modules/bcrypt/node_modules/bindings/bindings.js:87
REM  throw err
REM         ^
REM Error: Could not load the bindings file. Tried:
REM  → /home/john/projects/mean/dickey/app/node_modules/bcrypt/build/bcrypt_lib.node

REM http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
REM Install mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo apt-get install -y mongodb-org=2.6.1 mongodb-org-server=2.6.1 mongodb-org-shell=2.6.1 mongodb-org-mongos=2.6.1 mongodb-org-tools=2.6.1

REM need 'async' for ./lib/log4js 
npm install --save async

REM need 'underscore' for ./lib/log4js 
npm install --save underscore

REM Need Redis for pubsub.js
npm install --save redis

REM Need ZeroMQ since Redis is not supported on Windows...
REM (Microsoft's engineers ported it a few years back,
REM  but only for 64-bit...)
npm install --save zmq

REM Install Protractor...but only for dev...
npm install --save-dev protractor

REM Protractor has a nifty utility for setting up WebDriver with Selenium...
./node_modules/.bin/webdriver-manager update

REM Install Mocha...but only for dev...
npm install --save-dev mocha

REM Install Chai...assertion library to use with Mocha...
npm install --save-dev chai

REM Install chai-as-promised plugin for Chai...syntactic sugar to make it easier to work with promises...
npm install --save-dev chai-as-promised.

REM Install supertest -- a test jig supplied by Express to allow
REM your custom code to consume requests rather than Express. 
REM Kinda-sorta a mock Express object...?
npm install --save-dev supertest

REM For Mocha testing...get the web token lickety-split
REM without bothering with the API...
npm install --save-dev jsonwebtoken

REM To generate coverage report with Mocha...
npm install --save-dev blanket 
