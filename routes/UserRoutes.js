const express = require('express');
const router = express.Router();
const { UserLogin,GetUserData } = require("../controllers/UserController");

//
// user routes
router.post('/postlogin', UserLogin);
router.get('/getlogin', GetUserData);

module.exports = router