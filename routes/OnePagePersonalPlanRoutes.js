const express = require("express");
const { createOrUpdateAspiration, fetchAspiration } = require("../controllers/onePagePersonalPlan/TenYearsAspirationControllers");
const router = express.Router();

router.post('/create', createOrUpdateAspiration);
router.get('/get/:companyId', fetchAspiration);

module.exports = router;