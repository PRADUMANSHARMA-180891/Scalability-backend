const express = require('express');
const { shareCompany } = require('../controllers/ShareControllers');

const router = express.Router();

router.post('/share', shareCompany);



module.exports = router;