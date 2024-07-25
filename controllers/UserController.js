const User = require('../models/UserModels');
const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');
// Login for user
const UserLogin = async (req, res) => {
  try {
    const findUser = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (findUser) {
        const isPassword = await bcrypt.compare(req.body.user_password, findUser.user_password);
        if (!isPassword) {
            return res.status(400).json({
                message: false,
                errorMessage: "Invalid email and password"
            })
        }
        const token = await User.generateToken({ id: findUser.id, name: "abc", email: findUser.email, company_id: 17 });
        // await User.update({ remember_token: token }, {
        //     where: {
        //         id: findUser.id
        //     }
        // })
        return res.status(200).json({ status: true, message: "Login  successfully", token: token, user: findUser });
    } else {
        return res.status(400).json({ status: false, errorMessage: "user does not exist" });
    }
} catch (error) {
    return res.status(404).json(error);
}
};

// Get user data
const GetUserData = async (req, res) => {
  try {
    const id = req.user.id; // Get userId from decoded token
    console.log(id)
    const user = await User.findByPk(id, {
      attributes: ['name', 'email', 'user_photo', 'phone_number', 'x', 'facebook', 'linkedin', 'user_roles','D','I','S','C','D2','I2','S2','C2'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while fetching user data', error });
  }
};
//multer
// Configure Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Adding a timestamp to the file name to make it unique
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Initialize multer with the storage and file filter settings
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
});

// updateUser controller function
// const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { Id } = req.params;
  const updatedData = req.body;

  try {
    console.log(`Received userId: ${Id}`);
    const user = await User.findByPk(Id);
    
    if (!user) {
      console.log(`User with id ${Id} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.file) {
      updatedData.user_photo = req.file.path;
    }

    if (updatedData.newPassword && updatedData.confirmPassword) {
      if (updatedData.newPassword !== updatedData.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      } else {
        const hashPassword = await bcrypt.hash(updatedData.newPassword, 10);
        updatedData.user_password = hashPassword;
      }
      delete updatedData.newPassword;
      delete updatedData.confirmPassword;
    }

    await user.update(updatedData);

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Search users by name
const SearchUsersByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Name query parameter is required' });
    }

    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // Use the Op.like operator for partial matching
        },
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while searching for users', error });
  }
};

// get singal user
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Something went wrong while fetching user data', error });
  }
};

module.exports = { UserLogin, GetUserData, updateUser,upload, SearchUsersByName,getUserById };
