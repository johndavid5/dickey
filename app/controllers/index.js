// Break stuff out of server.js into ./controllers/index.js
// so that supertest Mocha unit tests have a common base to the
// actual server...a new root router object...
var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.use(require('../auth'));

router.use('/api/posts', require('./api/posts'));
router.use('/api/sessions', require('./api/sessions'));
router.use('/api/users', require('./api/users'));
router.use('/', require('./static'));

module.exports = router;

