const express = require('express');
const CreateStuck = require('../controllers/StuckControllers');

const router = express.Router();

router.post('/create', CreateStuck);


module.exports = router;