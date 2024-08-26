const Huddle = require('../models/huddle/HuddleModels');
const { Op, where } = require('sequelize');
// Add a new huddle
const addHuddle = async (req, res) => {
    const {
      // name,
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
      participants
    } = req.body;
  
    try {
      const newHuddle = await Huddle.create({
        // name,
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
        participants
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
// get huddle by huddle type
// for task component
const getHuddleByName = async(req,res)=>{
  try {
    const { huddleType } = req.query

     if(!huddleType){
         return res.status(404).json({message:"name parameter is require"})
     }

     const huddleName = await Huddle.findAll({
      where :{
        huddleType :{
          [Op.like]: `%${huddleType}%`,
        }
      }
     });

     if( huddleName.length == 0 ){
       return res.status(404).json({message:"priorityName is not found"})
     };

    res.status(200).json(huddleName);
  } catch (error) {
    res.status(500).json({message:"something went wrong while searching name",error})
  }
}

// edit huddle
const editHuddle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateHuddle = req.body;

    // Find the huddle by ID
    const huddle = await Huddle.findByPk(id);
    if (!huddle) {
      console.log(`Huddle with id ${id} not found`);
      return res.status(404).json({ message: 'Huddle not found' });
    }

    // Update the huddle with new data
    await huddle.update(updateHuddle);

    // Return the updated huddle
    res.status(200).json(huddle);
  } catch (error) {
    console.error("Error updating huddle:", error);
    res.status(500).json({ message: "Something went wrong while editing the huddle", error });
  }
}; 

// delete
const deleteHuddle = async (req, res) => {
  try {
    const { id } = req.params;
    const huddle = await Huddle.findByPk(id);
    if (!huddle) {
      return res.status(404).json({ error: 'Huddle not found' });
    }

    await huddle.destroy(); // Make sure to destroy the huddle before sending the response

    res.status(204).json({ message: 'Huddle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete huddle' });
  }
};

module.exports = { addHuddle, getAllHuddles, getHuddleByName ,editHuddle, deleteHuddle };