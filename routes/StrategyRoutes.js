const express = require('express');
const { createProcessAcountability, fetchProcessAccountability } = require('../controllers/strategy/ProcessAccountabilityControllers');
const { createCashAcceleration, fetchCashAcceleration } = require('../controllers/strategy/CashAccelerationControllers');
const { createPowerOfOne, fetchPowerOfOne } = require('../controllers/strategy/PowerOfOneControllers');
// const createProcessAcountability = require('../controllers/strategy/ProcessAccountabilityControllers');

const router = express.Router();
// ProcessAcountability
router.post('/create', createProcessAcountability);
router.get('/get/:companyId', fetchProcessAccountability);

// CashAcceleration
router.post('/cashacceleration/create', createCashAcceleration);
router.get('/cashacceleration/get/:companyId', fetchCashAcceleration);

// CashAcceleration
router.post('/powerofone/create', createPowerOfOne);
router.get('/powerofone/get/:companyId', fetchPowerOfOne);

module.exports = router;