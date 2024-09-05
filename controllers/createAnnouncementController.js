// controllers/announcementController.js

const Announcement = require('../models/createAnnouncementModels.js');
const User = require('../models/UserModels.js');
const nodemailer = require('nodemailer');
// const createAnnouncement = async (req, res) => {
//   try {
//     const { title, emailSubject, message, isChecked, userId } = req.body;
//     if(!title, !emailSubject, !message, !isChecked, !userId){
//           res.status(402).json({message:"all fields requited"})
//     }
//     const newAnnouncement = await Announcement.create({
//       title,
//       emailSubject,
//       message,
//       isChecked,
//       userId // include the userId
//     });
//     res.status(201).json(newAnnouncement);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// get data 


const createAnnouncement = async (req, res) => {
  try {
    const { title, emailSubject, message, isChecked, userId } = req.body;

    if (!title || !emailSubject || !message || !userId) {
      return res.status(402).json({ message: "All fields are required" });
    }

    const newAnnouncement = await Announcement.create({
      title,
      emailSubject,
      message,
      isChecked,
      userId 
    });

    // If isChecked is true, send an email to all users
    if (isChecked) {
      const users = await User.findAll({ attributes: ['email'] });
      const emailAddresses = users.map(user => user.email);

      // Set up the email transporter using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'gmail'
        auth: {
          user: 'growthh.in@gmail.com',
          pass: 'fsee idmx dcyf vzhj'
        }
      });

      // Email options
      const mailOptions = {
        from: 'growthh.in@gmail.com',
        to: emailAddresses,
        subject: emailSubject,
        text: message,
        html: `<p>${message}</p>` // you can use HTML for a more formatted email
      };

      // Send the email to all users
      await transporter.sendMail(mailOptions);
    }

    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncement = async (req, res) => {
    const { id } = req.params;
    try {
      const userWithAnnouncements = await User.findByPk(id, {
        include: {
          model: Announcement,
          as: 'Announcements',
        },
      });
      
      if (!userWithAnnouncements) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(userWithAnnouncements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // edit announcement
  // const Announcement = require('../models/AnnouncementModel.js'); // Adjust path as necessary

// Controller function to edit an announcement
const editAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, emailSubject, message, isChecked } = req.body;

        // Find the announcement by ID
        const announcement = await Announcement.findByPk(id);

        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        // Update the announcement
        announcement.title = title || announcement.title;
        announcement.emailSubject = emailSubject || announcement.emailSubject;
        announcement.message = message || announcement.message;
        announcement.isChecked = isChecked !== undefined ? isChecked : announcement.isChecked;

        // Save the updated announcement
        await announcement.save();

        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports ={ createAnnouncement, getAnnouncement, editAnnouncement } 

