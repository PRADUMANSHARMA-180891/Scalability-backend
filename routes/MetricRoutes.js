const express = require('express');
const CreateMetric = require('../controllers/MetricControllers');
// const createSuggestion  = require('../controllers/SuggestionControllers')

const router = express.Router();

router.post('/create', CreateMetric);


module.exports = router;