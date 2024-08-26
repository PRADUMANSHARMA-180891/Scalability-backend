// controllers/userInviteController.js
const  UserInvite  = require('../models/sendEmail/SendEmailModels');
const crypto = require('crypto');
const sendInviteEmail = require('../Config/NodeMailer');
const User = require('../models/UserModels');
const bcrypt = require('bcrypt');

const  createInvite = async (req, res) => {
  try {
    const { email, role } = req.body;

    // Generate a unique token for the invitation
    const token = crypto.randomBytes(16).toString('hex');

    // Create the invite in the database
    const invite = await UserInvite.create({ email, role, token });

    // Send the invitation email
    await sendInviteEmail(email, token);

    res.status(201).json(invite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptInvitation = async (req, res) => {
    try {
      const { token } = req.params;
  
      // Find the invitation by token
      const invite = await UserInvite.findOne({ where: { token } });
  
      if (!invite) {
        return res.status(404).json({ message: 'Invitation not found' });
      }
  
      if (invite.accepted) {
        return res.status(400).json({ message: 'Invitation already accepted' });
      }
  
      // Mark the invitation as accepted
      invite.accepted = true;
      await invite.save();
  
      // In a real app, you would gather more user data here, such as name and password
      const userData = {
        email: invite.email,
        name: 'New User', // Placeholder, you might want to gather the actual name
        user_password: await bcrypt.hash('defaultpassword', 10), // Generate a hashed password
        user_roles: invite.role,
      };
       if(!userData){
        res.status(401).json({message: " user data  not found properly "})
       }
      // Create a new user account
      const newUser = await User.create(userData);
      if(!newUser){
        res.status(401).json({message:"user not found"});
      }
  
      res.json({ message: 'Invitation accepted and user account created', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// get all invitation
const getAllInvitation = async(req,res) =>{
  try {
    const Invitaion = await UserInvite.findAll({});
    res.status(200).json(Invitaion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Invitation data' });
  }
}
// delete invitation
// delete user
const DeleteInvitation = async(req,res)=>{
  try {
      const { id } = req.params;
  
      const user = await UserInvite.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
  
      await user.destroy();
  
      res.status(204).json({ message: 'user deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
}
module.exports= {createInvite, acceptInvitation, getAllInvitation, DeleteInvitation}