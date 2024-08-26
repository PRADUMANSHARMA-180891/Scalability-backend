const express = require('express');
const router = express.Router();
const { CreateCompany,getCompanyData, deleteCompany, getCompanyById, updateCompany, upload } = require('../controllers/CompanyControllers');

// company routes
router.post('/create',CreateCompany);
router.get("/getcompany", getCompanyData);
router.get("/getcompanybById/:id", getCompanyById);
router.put("/update/:id",upload.single('profile_picture'), updateCompany);
router.delete('/deletecompany/:id',deleteCompany);

module.exports = router;