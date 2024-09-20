const express = require('express');
const { createProcessAcountability, fetchProcessAccountability } = require('../controllers/strategy/ProcessAccountabilityControllers');
const { createCashAcceleration } = require('../controllers/strategy/CashAccelerationControllers');
// const createProcessAcountability = require('../controllers/strategy/ProcessAccountabilityControllers');

const router = express.Router();
// ProcessAcountability
router.post('/create', createProcessAcountability);
router.get('/get/:companyId', fetchProcessAccountability);

// CashAcceleration
router.post('/cashacceleration/create', createCashAcceleration);
// router.get('/get/:companyId', fetchProcessAccountability);

module.exports = router;