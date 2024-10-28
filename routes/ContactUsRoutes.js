const express = require('express');
const { submitContactForm } = require('../controllers/ContactUsControllers');
const router = express.Router();

router.post('/send', submitContactForm);


module.exports = router;