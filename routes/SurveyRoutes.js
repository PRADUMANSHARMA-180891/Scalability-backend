const express = require('express');
const { createSurvey, createQuestion, createSurveyAndQuestion, getSurveyData, resendSurveyEmails, getSurveyDataById, deleteSurvey, closeSurvey, reOpenSurvey, editSurveyAndQuestions, SurveyResponse } = require('../controllers/SurveyControllers');
// const createSurvey = require('../controllers/SurveyControllers');

const router = express.Router();

router.post('/create', createSurvey);
router.post('/create-question', createQuestion);
router.post('/create-survey-question', createSurveyAndQuestion);
router.get('/getsurvey', getSurveyData);
router.post('/resendemail', resendSurveyEmails);
router.get('/survey/:id', getSurveyDataById);
router.delete('/survey/:id', deleteSurvey);
router.put('/survey/close/:id', closeSurvey);
router.put('/survey/reopen/:id', reOpenSurvey);
router.put('/editsurvey/:id', editSurveyAndQuestions);
router.post('/create-response', SurveyResponse);

module.exports = router;