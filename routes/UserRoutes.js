const express = require('express');
const router = express.Router();
const { UserLogin,GetUserData, updateUser, upload, SearchUsersByName, getUserById } = require("../controllers/UserController");
const VerifyToken = require('../middleware/AuthMiddleware');

//
// user routes
router.post('/postlogin', UserLogin);
router.get('/getlogin',GetUserData);
router.put('/updateuser/:Id',upload.single('user_photo'), updateUser);
router.get('/search',SearchUsersByName);
router.get('/search/:id',getUserById);
module.exports = router