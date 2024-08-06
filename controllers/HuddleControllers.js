const Huddle = require('../models/huddle/HuddleModels');

// Add a new huddle
const addHuddle = async (req, res) => {
    const {
      name,
      owner,
      videoConferenceLink,
      startTime,
      endTime,
      timeZone,
      description,
      daysOfWeek,
    //   canMeetOnWeekends,
      weekendDays,
      tags,
      huddleType,
    } = req.body;
  
    try {
      const newHuddle = await Huddle.create({
        name,
        owner,
        videoConferenceLink,
        startTime,
        endTime,
        timeZone,
        description,
        daysOfWeek: JSON.parse(daysOfWeek),
        // canMeetOnWeekends,
        weekendDays: JSON.parse(weekendDays),
        tags: JSON.parse(tags),
        huddleType,
      });
  
      res.status(201).json(newHuddle);
    } catch (error) {
      console.error('Error creating huddle:', error);
      res.status(500).json({ error: 'Failed to create huddle' });
    }
  };

// Get all huddles
const getAllHuddles = async (req, res) => {
  try {
    const huddles = await Huddle.findAll();
    res.status(200).json(huddles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch huddles' });
  }
};

module.exports = {addHuddle,getAllHuddles};