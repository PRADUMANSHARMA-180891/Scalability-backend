const express = require('express');
const { createProcessAcountability, fetchProcessAccountability } = require('../controllers/strategy/ProcessAccountabilityControllers');
const { createCashAcceleration, fetchCashAcceleration } = require('../controllers/strategy/CashAccelerationControllers');
const { createPowerOfOne, fetchPowerOfOne } = require('../controllers/strategy/PowerOfOneControllers');
const { createFunctionalAcountability, fetchFunctionalAcountability } = require('../controllers/strategy/FunctionalAccountabilityControllers');
const { create7Starta, fetch7Starta } = require('../controllers/strategy/7Strata');
const { create4DVision, fetch4DVision } = require('../controllers/strategy/4D-VisionControllers');
const { createAlignmentChecklist, updateAlignment,  getAlignmentByCompanyId } = require('../controllers/strategy/AlignmentChecklistControllers');
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
// CashAcceleration
router.post('/functional/create', createFunctionalAcountability);
router.get('/functional/get/:companyId', fetchFunctionalAcountability);
// 7 Starta
router.post('/starta/create', create7Starta);
router.get('/starta/get/:companyId', fetch7Starta);
// 4-D-Vision
router.post('/vision/create', create4DVision);
router.get('/vision/get/:companyId', fetch4DVision);

// Alignment Checklist
router.post('/alignment/create', createAlignmentChecklist);
router.get('/alignment/get/:companyId', getAlignmentByCompanyId);
router.put('/alignment/update/:id', updateAlignment);
// router.get('/vision/get/:companyId', fetch4DVision);

module.exports = router;