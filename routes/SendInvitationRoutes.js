const express = require('express');
const { createInvite, acceptInvitation,  } = require('../controllers/SendInvitationControllers');
// const CreateTask = require('../controllers/TaskControllers');
const router = express.Router();

router.post('/invite', createInvite);
router.post('/invite/accept/:token',acceptInvitation);

module.exports = router;