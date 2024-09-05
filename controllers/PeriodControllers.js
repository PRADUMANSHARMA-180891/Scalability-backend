const { Op } = require('sequelize');
const Period = require('../models/period/CreatePeriod');

const createPeriod = async (req, res) => {
  try {
    const periods = req.body.periods;

    // Validate the required fields for each period
    if (!Array.isArray(periods) || periods.some(p => !p.start_date || !p.end_date)) {
      return res.status(400).json({ message: 'Each period must have a start date and end date' });
    }

    // Create multiple periods
    const newPeriods = await Period.bulkCreate(periods);

    // Respond with the created periods
    res.status(201).json({ message: 'Periods created successfully', data: newPeriods });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while creating the periods', error });
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
  
  module.exports = {createPeriod, getAdjacentPeriods, getAllPeriod} ;