const express = require("express");
const { addHuddle, getAllHuddles, getHuddleByName, editHuddle, deleteHuddle, huddleReport } = require("../controllers/HuddleControllers");
// const {createPeriod, getAdjacentPeriods, getAllPeriod}  = require("../controllers/PeriodControllers");
const router = express.Router();

router.post('/create', addHuddle);
router.get('/gethuddle', getAllHuddles);
router.get('/search', getHuddleByName);
router.put('/updatehuddle/:id', editHuddle);
router.delete('/deletehuddle/:id', deleteHuddle);
router.get('/report', huddleReport);

module.exports = router;