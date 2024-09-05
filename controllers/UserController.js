const User = require('../models/UserModels');
const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const  transporter  = require('../utils/ResetPassword');
const Company = require('../models/CompanyModels');
// const crypto = require('crypto');

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
const createNewUser = async (req, res) => {
  const { firstName, lastName, title, role, department, user_Password, email, token } = req.body;

  try {
      // Validate the token if necessary (this part depends on your use case)
      // For example, you might look up an invitation record by this token

      // Check if the user already exists by email
      let user = await User.findOne({ where: { email } });

      if (user) {
          return res.status(400).json({ message: 'A user with this email already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(user_Password, 10);

      // Create the new user
      user = await User.create({
          name: `${firstName} ${lastName}`,
          email,
          user_password: hashedPassword,
          position: title || null,
          user_roles: role || null,
          department: department || null,
          // resetPasswordToken: null, // Clear the token if it's being used for validation
          is_verified: true, // Mark the user as verified since they accepted the invite
      });

      res.status(201).json({ message: 'User created and invitation accepted successfully.' });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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
// get all user data
const getAllUserData = async(req,res)=>{
     try {
         const getAllUser = await User.findAll({
          attributes:['name','email','user_roles','created_at','id']
         });
         if(!getAllUser){
          res.status(404).json({message: "user not found"})
         }
         res.status(200).json(getAllUser);
     } catch (error) {
        res.status(400).json({message:"something went wrong while getting all user data",error})
     }
}
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
// delete user
const DeleteUser = async(req,res)=>{
  try {
      const { id } = req.params;
  
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
  
      await user.destroy();
  
      res.status(204).json({ message: 'user deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
}

// reset password
// const sendResetPasswordEmail = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });

//     const resetLink = `http://localhost:3000/reset-password/${token}`;

//     const mailOptions = {
//       from: 'growthh.in@gmail.com',
//       to: user.email,
//       subject: 'Password Reset',
//       html: `
//                 <p>You requested a password reset. Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>
//             `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'Password reset email sent!' });
//   } catch (error) {
//     console.error('Error occurred:', error); // Log the error
//     res.status(500).json({ message: 'Something went wrong', error });
//   }
// };

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // const resetToken = crypto.randomBytes(32).toString('hex');
      const resetToken = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });
      user.remember_token = resetToken;
      await user.save();

      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      
      await transporter.sendMail({
          to: user.email,
          subject: 'Password Reset',
          html: `
              <p>You requested a password reset. Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>
          `,
      });

      res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  // const { token } = req.params;
  try {
      const user = await User.findOne({ where: { remember_token: token } });
      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.user_password = hashedPassword;
      user.remember_token = null; // Clear the reset token
      await user.save();

      res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

Company.hasMany(User, { foreignKey: 'companyId', as: 'users' });
User.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = { UserLogin, GetUserData, getAllUserData, updateUser, upload, SearchUsersByName,getUserById, DeleteUser, sendResetPasswordEmail, resetPassword, createNewUser };
