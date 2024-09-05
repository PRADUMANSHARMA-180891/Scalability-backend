const { where } = require("sequelize");
const Company = require("../models/CompanyModels");
const multer = require("multer");
const path = require('path');
const User = require("../models/UserModels");

const CreateCompany = async(req,res)=>{
    try {
        const {company_name,company_size,first_name,last_name,email,phone,role,business_habit} =req.body;
        if(!company_name,!company_size,!first_name,!last_name,!email,!phone,!role,!business_habit){
            res.status(404).json({message:"all fields are mendodary"})
        }
        const createCompanyData = await Company.create({
            company_name,
            company_size,
            first_name,
            last_name,
            email,
            phone,
            role,
            business_habit
        });
        // const createCompanyData = await Company.create(req.body);
        if(!createCompanyData){
            res.status(404).json({message:"something went wrong while creating company"})
        }
        res.status(201).json(createCompanyData);
    } catch (error) {
        res.status(400).json(error)
    }
};

const getCompanyData = async (req, res) => {
    try {
      const companyData = await Company.findAll({
        attributes: ['company_name','id'] // Specify the attributes you want to retrieve
      });
  
      if (!companyData || companyData.length === 0) {
        return res.status(404).json({ message: "No company data found" });
      }
  
     return res.status(200).json(companyData);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong while getting data", error: error.message });
    }
  };

  // report generation for company and user
  const getDataForReport = async (req, res) => {
    try {
      const companyReport = await Company.findAll({
        include: [{
          model: User,
          as: 'users', // Ensure this alias matches the one in your association
          attributes: ['id', 'name', 'email', 'position'] // Specify which user fields you want to include
        }]
      });
  
      if (companyReport.length === 0) {
        return res.status(404).json({ message: "No companies found" });
      }
  
      return res.status(200).json(companyReport);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching report data", error });
    }
  };

// getCompanyById
// const getCompanyById = async(req,res)=>{
//   const {id} = req.params;
//     try {
//       const getCompanyData = await Company.findByPk(id);
//       if(!getCompanyData){
//         res.status(404).json({message: "something went worng while"});
//       }
//      return res.status(201).json(getCompanyData);
//     } catch (error) {
//        res.status(404).json({message: "something went worng while",error});
//     }
// }

const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const getCompanyData = await Company.findByPk(id, {
      include: [{
        model: User,
        as: 'users', // Make sure this matches the alias used in the association
        attributes: ['id', 'name', 'email', 'position'] // Specify which user fields you want to include
      }]
    });

    if (!getCompanyData) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json(getCompanyData);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
}

//multer
// Configure Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Adding a timestamp to the file name to make it unique
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Initialize multer with the storage and file filter settings
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
});
// Update company
const updateCompany = async (req, res) => {
  try {
    const {id} = req.params
      const company = await Company.findByPk(id);
      if (!company) {
          return res.status(404).json({ message: "Company not found" });
      }
      if (req.file) {
        company.profile_picture = req.file.path;
      }
      await company.update(req.body);
      res.status(200).json(company);
  } catch (error) {
      res.status(500).json({ message: "Error updating company", error });
  }
};

  //delete company
  const deleteCompany = async(req,res) =>{
    const { id } = req.params;
    try {
      const result = await Company.destroy({ where: { id } });
      if (!result) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.status(200).json({ message: "Company data deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong while deleting company data" });
    }
  }
  

module.exports = { CreateCompany, getCompanyData, getDataForReport, getCompanyById, deleteCompany,upload, updateCompany }