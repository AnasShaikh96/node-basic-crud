const express = require('express');
const router = express.Router();
const UserController = require("./UserController");
const isAuthenticatedMiddleware = require('../../middlewares/isAuthenticatedMiddleware');
const checkPermissionMiddleware = require('../../middlewares/checkPermissionMiddleware');


router.get('/', [isAuthenticatedMiddleware.check], UserController.getOneUser)
router.get('/all', [isAuthenticatedMiddleware.check, checkPermissionMiddleware.checkPermission], UserController.getAllUsers)
router.patch('/update', [isAuthenticatedMiddleware.check, checkPermissionMiddleware.checkPermission], UserController.patchUser)


module.exports = router