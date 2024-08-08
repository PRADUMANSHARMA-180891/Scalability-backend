const express = require("express");
const {createPriority, getPriority, getPriorityByDate, getPriorityByName} = require("../controllers/PriorityControllers");
const router = express.Router();

router.post('/create', createPriority);
router.get('/get', getPriority);
router.get('/getpriority', getPriorityByDate);
router.get('/search', getPriorityByName);

module.exports = router;