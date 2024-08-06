const express = require("express");
const { addHuddle, getAllHuddles } = require("../controllers/HuddleControllers");
// const {createPeriod, getAdjacentPeriods, getAllPeriod}  = require("../controllers/PeriodControllers");
const router = express.Router();

router.post('/create',addHuddle);
router.get('/gethuddle',getAllHuddles);


module.exports = router;