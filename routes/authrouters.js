const express = require('express');
//Creating a Router
var authrouter = express.Router();
const auth = require("../middleware/auth");
var userController= require('../controllers/userController');
authrouter.use(auth);
authrouter.route('/welcome').get(userController.welcome);
authrouter.route('/listuser').get(userController.listUser);
authrouter.route('/updateuser/:id').put(userController.updateUser)
authrouter.route('/deleteuser/:id').delete(userController.deleteUser)

module.exports = authrouter;