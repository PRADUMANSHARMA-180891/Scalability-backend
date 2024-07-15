const User = require('../models/UserModels');

//Login for user

const UserLogin = async(req,res)=>{
     try {
        const {email, password} = req.body;
        if(!email,!password){
            res.status(404).json({message : "email and password required"});
        }
        const postLoginData = await User.create({
            email,
            password
        });
        if(!postLoginData){
            res.status(404).json({message: "something went worng while creating user"})
        }

        res.status(200).json(postLoginData);
     } catch (error) {
        res.status(400).json({message: "something wrong while posting data"});
     }
}

// get user data

const GetUserData = async(req,res)=>{
    try {
        const getUser = await User.findAll({});
        if(!getUser){
            res.status(404).json({message:"something went wrong while getting data"})
        }
        res.status(201).json(getUser);
    } catch (error) {
        res.status(400).json(error, {message: "something went wrong while getting user data"})
    }
}

module.exports = { UserLogin, GetUserData };