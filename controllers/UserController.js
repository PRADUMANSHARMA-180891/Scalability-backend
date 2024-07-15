const User = require('../models/UserModels');

// Login for user
const UserLogin = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      username,
      user_photo,
      phone_number,
      p_isd,
      whatsapp_no,
      w_isd,
      otp,
      position,
      is_login,
      is_verified,
      company_id,
      departments_id,
      status,
      remember_token
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const postLoginData = await User.create({
      name,
      email,
      password,
      username,
      user_photo,
      phone_number,
      p_isd,
      whatsapp_no,
      w_isd,
      otp,
      position,
      is_login,
      is_verified,
      company_id,
      departments_id,
      status,
      remember_token
    });

    if (!postLoginData) {
      return res.status(500).json({ message: "Something went wrong while creating user" });
    }

    res.status(201).json(postLoginData);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while posting data", error });
  }
};

// Get user data
const GetUserData = async (req, res) => {
  try {
    const getUser = await User.findAll({
        attributes: ['name','email',"password","username","user_photo","phone_number"]
    });
    if (!getUser) {
      return res.status(404).json({ message: "No user data found" });
    }
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while getting user data", error });
  }
};

module.exports = { UserLogin, GetUserData };
