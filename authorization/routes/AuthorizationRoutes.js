const AuthorizationController = require('../controller/AuthorizationController');

const router = require('express').Router();


router.post('/register', AuthorizationController.register)


module.exports = router;

