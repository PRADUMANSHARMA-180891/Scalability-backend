const express = require('express');
const router = express.Router();
const { UserLogin,GetUserData, updateUser, upload, SearchUsersByName, getUserById, getAllUserData, DeleteUser, ResetPassword, sendResetPasswordEmail, resetPassword, createNewUser } = require("../controllers/UserController");
const VerifyToken = require('../middleware/AuthMiddleware');

//
// user routes
router.post('/postlogin', UserLogin);
router.post('/create', createNewUser);
router.get('/getlogin', GetUserData);
router.get('/getalluser', getAllUserData);
router.put('/updateuser/:Id',upload.single('user_photo'), updateUser);
router.get('/search', SearchUsersByName);
router.get('/search/:id', getUserById);
router.delete('/delete/:id', DeleteUser);
router.post('/resetpassword', sendResetPasswordEmail);
router.post('/reset', resetPassword);


module.exports = router