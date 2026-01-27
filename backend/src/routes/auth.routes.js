const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Verify that authController.register is not undefined
console.log('Controller Check:', authController);

router.post('/login', authController.login);
// This creates the /register part
router.post('/register', authController.register);


module.exports = router;