const express = require("express");
const {createPeriod, getAdjacentPeriods, getAllPeriod, updatePeriod}  = require("../controllers/PeriodControllers");
const router = express.Router();

router.post('/create',createPeriod);
router.get('/period',getAdjacentPeriods);
router.get('/get',getAllPeriod);
router.put('/update/:id', updatePeriod);

module.exports = router;