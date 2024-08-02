const express = require("express");
const {createPriority, getPriority, getPriorityByDate} = require("../controllers/PriorityControllers");
const router = express.Router();

router.post('/create', createPriority);
router.get('/get', getPriority);
router.get('/getpriority', getPriorityByDate);

module.exports = router;