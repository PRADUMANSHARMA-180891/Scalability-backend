const Stuck = require('../models/stuck/StuckModels');
const { Op } = require("sequelize");

const CreateStuck = async(req,res) =>{
    try {
        const { iNeedHelpFrom, notes } = req.body;
        const newStuck = await Stuck.create({ iNeedHelpFrom, notes });
        if(!newStuck){
            res.status(404).json({message: "something went wrong while creating stuck"});
        }
        res.status(201).json(newStuck);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const GenerateReport= async (req, res) => {
  try {
    const { start_date, end_date } = req.query; // Extract start_date and end_date from query parameters

    if (!start_date || !end_date) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }

    // Query the database for tasks updated within the specified date range
    const stucks = await Stuck.findAll({
      where: {
        updatedAt: {
          [Op.between]: [new Date(start_date), new Date(end_date)] // Ensure updatedAt falls within the range
        }
      }
    });

    if (stucks.length === 0) {
      return res.status(404).json({ message: "No stucks found for the specified date range" });
    }

    res.status(200).json(stucks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stucks", error: error.message });
  }
};

module.exports = { CreateStuck, GenerateReport }