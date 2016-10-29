var express = require('express'),
    router = express.Router();

var checkToken = require('../../utils/checkToken');

var User = require('../../controllers/user');

// auth
router.post('/auth', (req, res, next) => {
    User.checkUser(req, res, next);

});

//reg user
router.post('/user', (req, res, next) => {
	console.info('reg user');
    User.addUser(req, res, next);
});

//get get
router.get('/user/:id', checkToken , (req, res, next) => {
    User.findUser(req, res, next);
});


module.exports = router