const express = require('express');
const createSuggestion  = require('../controllers/SuggestionControllers')

const router = express.Router();

router.post('/create', createSuggestion);


module.exports = router;