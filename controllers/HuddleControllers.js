const Huddle = require('../models/huddle/HuddleModels');
const { Op } = require('sequelize');
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
module.exports = { addHuddle, getAllHuddles, getHuddleByName };