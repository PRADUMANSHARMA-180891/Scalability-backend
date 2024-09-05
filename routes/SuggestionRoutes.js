const express = require('express');
const { getAllSuggestions, createSuggestion, addResponse, getResponse } = require('../controllers/SuggestionControllers');
// const createSuggestion  = require('../controllers/SuggestionControllers')

const router = express.Router();

router.post('/create', createSuggestion);
router.get('/get', getAllSuggestions);

// response route
router.post('/response/:id', addResponse);
router.get('/response/:suggestionId', getResponse);

module.exports = router;