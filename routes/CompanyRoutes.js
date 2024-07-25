const express = require('express');
const router = express.Router();
const { CreateCompany,getCompanyData, deleteCompany, getCompanyById } = require('../controllers/CompanyControllers');

// company routes
router.post('/create',CreateCompany);
router.get("/getcompany", getCompanyData);
router.get("/getcompanybById/:id", getCompanyById);
router.delete('/deletecompany/:id',deleteCompany);

module.exports =router;