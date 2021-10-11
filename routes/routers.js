const express = require('express');
//Creating a Router
var router = express.Router();
var userController= require('../controllers/userController');
router.route('/register').post(userController.addUser);
router.route('/login').post(userController.login);
module.exports = router;