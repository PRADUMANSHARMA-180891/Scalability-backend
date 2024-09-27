const express = require('express');
const { createFoundation, fetchFoundation } = require('../controllers/strategy/FoundationControllers');

const router = express.Router();

// foundation routes
router.post('/foundation/create', createFoundation);
router.get('/foundation/get/:companyId', fetchFoundation);

module.exports = router;