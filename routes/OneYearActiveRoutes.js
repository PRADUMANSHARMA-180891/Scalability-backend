const express = require("express");
const { createOneYearYearAcive, fetchOneYearYearAcive } = require("../controllers/onePagePersonalPlan/OneYearActiveControllers");
const router = express.Router();

router.post('/create', createOneYearYearAcive);
router.get('/get/:companyId', fetchOneYearYearAcive);

module.exports = router;