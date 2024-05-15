const AuthorizationController = require('../controller/AuthorizationController');

const router = require('express').Router();


router.post('/register', AuthorizationController.register)
router.post('/login', AuthorizationController.login)


module.exports = router;

