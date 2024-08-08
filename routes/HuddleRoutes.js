const express = require("express");
const { addHuddle, getAllHuddles, getHuddleByName } = require("../controllers/HuddleControllers");
// const {createPeriod, getAdjacentPeriods, getAllPeriod}  = require("../controllers/PeriodControllers");
const router = express.Router();

router.post('/create',addHuddle);
router.get('/gethuddle',getAllHuddles);
router.get('/search',getHuddleByName);


module.exports = router;