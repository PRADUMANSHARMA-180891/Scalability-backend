const express = require('express');
const CreateTask = require('../controllers/TaskControllers');
const router = express.Router();

router.post('/create', CreateTask)

module.exports = router;