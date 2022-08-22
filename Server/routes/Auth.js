const express = require('express');
var router = express.Router();
var AuthController = require('../Controllers/Auth');

router.post('/SignUp', AuthController.signUp);
router.post('/SignIn', AuthController.signIn);

module.exports = router;
