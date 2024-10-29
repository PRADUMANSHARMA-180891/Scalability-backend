const express = require("express");
const { createNintyDaysAction, fetchNintyDaysAction } = require("../controllers/onePagePersonalPlan/NintyDaysActionControllers");
const router = express.Router();

router.post('/create', createNintyDaysAction);
router.get('/get/:companyId', fetchNintyDaysAction);

module.exports = router;
