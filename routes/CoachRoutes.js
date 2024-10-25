const express = require('express');
const { createInvite, getAllInvitation, acceptInvitation, updateInvitation } = require('../controllers/CoachControllers');

const router = express.Router();

router.post('/invite', createInvite);
router.post('/invite/accept/:token', acceptInvitation);
router.get('/getall', getAllInvitation);
router.put('/update/:id', updateInvitation); 
// router.delete('/delete/:id', DeleteInvitation);

module.exports = router;