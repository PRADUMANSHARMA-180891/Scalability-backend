

const express = require("express");
const {createEnpsSurvey,getAllSurveys, getSurveyById, deleteSurvey, closeEnpsSurvey, reOpenEnpsSurvey, EnpsSurveyResponse} = require("../controllers/EnpsControllers");
const router = express.Router();


router.post('/create', createEnpsSurvey);
router.get('/get', getAllSurveys);
router.get('/getbyid/:id', getSurveyById);
router.put('/close/:id', closeEnpsSurvey);
router.put('/reopen/:id', reOpenEnpsSurvey);
router.delete('/delete/:id', deleteSurvey);
router.post('/survey-response', EnpsSurveyResponse);

module.exports = router;