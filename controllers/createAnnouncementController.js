// controllers/announcementController.js

const Announcement = require('../models/createAnnouncementModels.js');
const User = require('../models/UserModels.js');

const createAnnouncement = async (req, res) => {
  try {
    const { title, emailSubject, message, isChecked, userId } = req.body;
    if(!title, !emailSubject, !message, !isChecked, !userId){
          res.status(402).json({message:"all fields requited"})
    }
    const newAnnouncement = await Announcement.create({
      title,
      emailSubject,
      message,
      isChecked,
      userId // include the userId
    });
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get data 

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
  
module.exports ={ createAnnouncement, getAnnouncement }

