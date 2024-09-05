const express = require('express');
const { CreateTask, GetTasksByUpdatedAtRange} = require('../controllers/TaskControllers');
// const CreateTask = require('../controllers/TaskControllers');
const router = express.Router();

router.post('/create', CreateTask)
router.get('/by-updated-range', GetTasksByUpdatedAtRange);

module.exports = router;