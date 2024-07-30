const express = require("express");
const {createPeriod, getAdjacentPeriods, getAllPeriod}  = require("../controllers/PeriodControllers");
const router = express.Router();

router.post('/create',createPeriod);
router.get('/period',getAdjacentPeriods);
router.get('/get',getAllPeriod);

module.exports = router;