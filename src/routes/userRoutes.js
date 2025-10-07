const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

router.post('/users', validateUser, userController.registerUser);
router.get('/users', userController.getUsers);
router.get('/users/:_id', userController.getUserById);

module.exports = router; 