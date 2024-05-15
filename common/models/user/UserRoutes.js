const express = require('express');
const router = express.Router();
const UserController = require("./UserController");
const isAuthenticatedMiddleware = require('../../middlewares/isAuthenticatedMiddleware');


router.get('/', [isAuthenticatedMiddleware.check], UserController.getOneUser)
router.get('/all', [isAuthenticatedMiddleware.check], UserController.getAllUsers)

router.patch('/update', [isAuthenticatedMiddleware.check], UserController.patchUser)


module.exports = router