const express = require('express');
const { createInvite, acceptInvitation, getAllInvitation, DeleteInvitation,  } = require('../controllers/SendInvitationControllers');
// const CreateTask = require('../controllers/TaskControllers');
const router = express.Router();

router.post('/invite', createInvite);
router.post('/invite/accept/:token', acceptInvitation);
router.get('/getall', getAllInvitation);
router.delete('/delete/:id', DeleteInvitation);

module.exports = router;