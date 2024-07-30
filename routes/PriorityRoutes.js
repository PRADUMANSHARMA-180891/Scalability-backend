const express = require("express");
const {createPriority, getPriority} = require("../controllers/PriorityControllers");
const router = express.Router();

router.post('/create', createPriority);
router.get('/get', getPriority);

module.exports = router;