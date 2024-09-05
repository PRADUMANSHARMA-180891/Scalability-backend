const express = require('express');
const { createSurvey, createQuestion, createSurveyAndQuestion } = require('../controllers/SurveyControllers');
// const createSurvey = require('../controllers/SurveyControllers');

const router = express.Router();

router.post('/create', createSurvey);
router.post('/create-question', createQuestion);
router.post('/create-survey-question', createSurveyAndQuestion);

module.exports = router;