const schemaValidationMiddleware = require('../../common/middlewares/schemaValidationMiddleware');
const AuthorizationController = require('../controller/AuthorizationController');
const loginPayload = require('../schemas/loginPayload');

const router = require('express').Router();


router.post('/register', AuthorizationController.register)
router.post('/login', [schemaValidationMiddleware.validate(loginPayload)], AuthorizationController.login)


module.exports = router;

