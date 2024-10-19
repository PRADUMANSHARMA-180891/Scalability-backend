const express = require('express');
const { CreateTask, GetTasksByUpdatedAtRange, getTask, EditTask, DeleteTask} = require('../controllers/TaskControllers');
// const CreateTask = require('../controllers/TaskControllers');
const router = express.Router();

router.post('/create', CreateTask)
router.get('/by-updated-range', GetTasksByUpdatedAtRange);
router.get('/get', getTask);
router.put('/update/:id', EditTask);
router.delete('/delete/:id', DeleteTask);

module.exports = router;