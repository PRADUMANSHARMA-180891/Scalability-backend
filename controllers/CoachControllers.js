// controllers/userInviteController.js
// const  UserInvite  = require('../models/sendEmail/SendEmailModels');
const crypto = require('crypto');
const sendInviteEmail = require('../Config/NodeMailer');
const User = require('../models/UserModels');
const bcrypt = require('bcrypt');
const CoachInvite = require('../models/coach/CoachModels');

const  createInvite = async (req, res) => {
    try {
      const { email, role } = req.body;
  
      // Generate a unique token for the invitation
      const token = crypto.randomBytes(16).toString('hex');
  
      // Create the invite in the database
      const invite = await CoachInvite.create({ email, role, token });
  
      // Send the invitation email
      await sendInviteEmail(email, token);
  
    //   res.status(201).json(invite);
    res.status(201).json({ id: invite.id, email: invite.email, role:invite.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // update functioanlity
  // Update invitation
const updateInvitation = async (req, res) => {
    try {
      const { id } = req.params; 
      const { email } = req.body; 
  
      // Find the invitation by ID
      const invite = await CoachInvite.findByPk(id);
  
      if (!invite) {
        return res.status(404).json({ message: 'Invitation not found' });
      }
  
      // Update the email and role if provided
      invite.email = email || invite.email;
      
      // Save the updated invitation
      await invite.save();
  
      // Optionally, re-send the updated invitation email if the email or role is changed
      if (email) {
        await sendInviteEmail(invite.email, invite.token);
      }
  
      res.status(200).json({ message: 'Invitation updated successfully', invite });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update invitation' });
    }
  };
// accept invitation
const acceptInvitation = async (req, res) => {
    try {
      const { token } = req.params;
  
      // Find the invitation by token
      const invite = await CoachInvite.findOne({ where: { token } });
  
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
        name: 'Coach', // Placeholder, you might want to gather the actual name
        user_password: await bcrypt.hash('defaultpassword', 10), // Generate a hashed password
        user_roles: invite.role,
      };
       if(!userData){
        res.status(401).json({message: "Coach data  not found properly"})
       }
      // Create a new user account
      const newUser = await User.create(userData);
      if(!newUser){
        res.status(401).json({message:"user not found"});
      }
  
      res.json({ message: 'Invitation accepted and Coach account created', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // get all invitation
// const getAllInvitation = async(req,res) =>{
//     try {
//       const Invitaion = await CoachInvite.findAll({});
//       res.status(200).json(Invitaion);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to retrieve Invitation data' });
//     }
//   }

const getAllInvitation = async (req, res) => {
    try {
      const invitations = await CoachInvite.findAll({
        order: [['createdAt', 'DESC']], // Sort by creation date in descending order
      });
      res.status(200).json(invitations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Invitation data' });
    }
  };
  
  module.exports = { createInvite, getAllInvitation, acceptInvitation, updateInvitation }