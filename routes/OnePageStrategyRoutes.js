const express = require('express');
const { createFoundation, fetchFoundation, removeItem } = require('../controllers/strategy/FoundationControllers');
const { createSupport, fetchSupport,  removeSupportItem } = require('../controllers/strategy/SupportControllers');
const { createTheme, fetchTheme } = require('../controllers/strategy/ThemeControllers');
const { createThreeToFive1, fetchThreetoFiveYearsPlan, removeThreeYearPlan } = require('../controllers/strategy/ThreeToFiveControllers1');
const { createThreeToFive2, fetchThreetoFiveYearsPlan2, removeThreeYearPlan2 } = require('../controllers/strategy/ThreeToFiveControllers2');
const { createQuaterly, fetchQuaterly } = require('../controllers/strategy/QuatralyControllers');

const router = express.Router();

// foundation routes
router.post('/foundation/create', createFoundation);
router.get('/foundation/get/:companyId', fetchFoundation);
router.delete('/foundation/remove/:companyId/:foundationField/:id', removeItem);
//support
router.post('/support/create', createSupport);
router.get('/support/get/:companyId', fetchSupport);
router.delete('/support/remove/:companyId/:SupportField/:id', removeSupportItem);
//Theme
router.post('/theme/create', createTheme);
router.get('/theme/get/:companyId', fetchTheme);
// Three to Five Years plan
router.post('/threetofive/create', createThreeToFive1);
router.get('/threetofive/get/:companyId', fetchThreetoFiveYearsPlan);
router.delete('/threetofive/remove/:companyId/:ThreeyearplanField/:id', removeThreeYearPlan);
// Three to Five Years Plan section 2
router.post('/fiveyearplan/create', createThreeToFive2);
router.get('/fiveyearplan/get/:companyId', fetchThreetoFiveYearsPlan2);
router.delete('/fiveyearplan/remove/:companyId/:ThreeyearplanField/:id', removeThreeYearPlan2);
// Quaterly Plan 
router.post('/quatrely/create', createQuaterly);
router.get('/quatrely/get/:companyId', fetchQuaterly);

module.exports = router;