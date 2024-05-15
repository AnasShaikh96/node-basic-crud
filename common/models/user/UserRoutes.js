const express = require('express');
const router = express.Router();
const UserController = require("./UserController");


router.get('/all', UserController.getAllUsers)
router.get('/:id', UserController.getOneUser)



module.exports = router