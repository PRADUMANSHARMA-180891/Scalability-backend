const { where } = require("sequelize");
const Company = require("../models/CompanyModels");

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
  

module.exports = { CreateCompany, getCompanyData,deleteCompany }