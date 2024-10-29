const { Op } = require('sequelize');
const Period = require('../models/period/CreatePeriod');

// const createPeriod = async (req, res) => {
//   try {
//     const periods = req.body.periods;

//     // Validate the required fields for each period
//     if (!Array.isArray(periods) || periods.some(p => !p.start_date || !p.end_date)) {
//       return res.status(400).json({ message: 'Each period must have a start date and end date' });
//     }

//     // Create multiple periods
//     const newPeriods = await Period.bulkCreate(periods);

//     // Respond with the created periods
//     res.status(201).json({ message: 'Periods created successfully', data: newPeriods });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'An error occurred while creating the periods', error });
//   }
// };

const createPeriod = async (req, res) => {
  try {
    const periods = req.body.periods;

    // Validate the required fields for each period
    if (!Array.isArray(periods) || periods.some(p => !p.start_date || !p.end_date)) {
      return res.status(400).json({ message: 'Each period must have a start date and end date' });
    }

    // Create multiple periods
    const newPeriods = await Period.bulkCreate(periods);

    // Retrieve the ID of the most recently created period
    const recentPeriod = await Period.findOne({
      order: [['createdAt', 'DESC']]
    });

    // Respond with the created periods and the most recent period ID
    res.status(201).json({
      message: 'Periods created successfully',
      data: newPeriods,
      recentPeriodId: recentPeriod ? recentPeriod.id : null
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while creating the periods', error });
  }
};

// update 
const updatePeriod = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date } = req.body;

    // Validate the required fields
    if (!start_date || !end_date) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    // Find the period by ID
    const period = await Period.findByPk(id);
    if (!period) {
      return res.status(404).json({ message: 'Period not found' });
    }

    // Update the period
    period.start_date = start_date;
    period.end_date = end_date;
    await period.save();

    // Respond with the updated period
    res.status(200).json({ message: 'Period updated successfully', data: period });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while updating the period', error });
  }
};



  // pagination 
const getAdjacentPeriods = async(req, res) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
     const products = await Period.findAll({});
    const paginatedProducts = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / pageSize);

    res.json({ products: paginatedProducts, totalPages });
};
  // get all period 
  const getAllPeriod = async(req,res)=>{
      try {
           const getAllDataOfPeriod = await Period.findAll({});
           if(!getAllDataOfPeriod){
            res.status(403).json({message: "period not found "});
           }
           return res.status(200).json(getAllDataOfPeriod);
      } catch (error) {
        res.status(404).json(error)
      }
  }
  
  module.exports = {createPeriod, getAdjacentPeriods, getAllPeriod, updatePeriod} ;