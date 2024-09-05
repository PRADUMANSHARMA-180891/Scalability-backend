const express = require('express');
const { GenerateReport, CreateStuck } = require('../controllers/StuckControllers');

const router = express.Router();

router.post('/create', CreateStuck);
router.get('/report', GenerateReport);


module.exports = router;