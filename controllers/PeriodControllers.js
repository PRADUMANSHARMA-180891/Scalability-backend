
const { Op } = require('sequelize');
const Period = require('../models/period/CreatePeriod');

// const createPeriod = async (req, res) => {


//     try {
//       const { start_date, end_date } = req.body;
  
//       // Validate the required fields
//       if (!start_date) {
//         return res.status(400).json({ message: 'Start date is required' });
//       }
  
//       // Create the period
//       const newPeriod = await Period.create({ start_date, end_date });
  
//       // Respond with the created period
//       res.status(201).json({ message: 'Period created successfully', data: newPeriod });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: 'An error occurred while creating the period', error });
//     }
//   };
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
// const products = [
//   { id: 1, start_date: "2024-07-01", end_date: "2025-01-01", },
//   { id: 2, start_date: "2025-07-01", end_date: "2026-01-01", },
//   { id: 3, start_date: "2026-07-01", end_date: "2027-01-01", }, 
//   { id: 4, start_date: "2027-07-01", end_date: "2028-01-01",},
//   { id: 5, start_date: "2028-07-01", end_date: "2025-01-01",},
//   { id: 6, start_date: "2029-07-01", end_date: "2025-01-01", },
//   { id: 7, start_date: "2020-07-01", end_date: "2025-01-01", },
//   { id: 8, start_date: "2021-07-01", end_date: "2020-01-01",},
//   { id: 9, start_date: "2022-07-01", end_date: "2029-01-01", },
//   { id: 10, start_date: "2023-07-01", end_date: "2028-01-01", },
//   { id: 11, start_date: "2024-07-01", end_date: "2027-01-01", },
//   { id: 12, start_date: "2025-07-01", end_date: "2026-01-01",},
//   // Add more products as needed
// ];

const getAdjacentPeriods = async(req, res) => {
  const page = parseInt(req.query.page) ;
    const pageSize = parseInt(req.query.pageSize) ;

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
  
  module.exports = {createPeriod, getAdjacentPeriods,getAllPeriod} ;