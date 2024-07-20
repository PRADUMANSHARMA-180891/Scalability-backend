const express = require('express');
const router = express.Router();
const { CreateCompany,getCompanyData, deleteCompany } = require('../controllers/CompanyControllers');

// company routes
router.post('/create',CreateCompany);
router.get("/getcompany", getCompanyData);
router.delete('/deletecompany/:id',deleteCompany);

module.exports =router;