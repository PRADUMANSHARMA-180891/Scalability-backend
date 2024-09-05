const express = require("express");
const router = express.Router();
const {createAnnouncement, getAnnouncement, editAnnouncement} = require("../controllers/createAnnouncementController");


router.post('/create', createAnnouncement);
router.get('/get/:id', getAnnouncement);
router.put('/update/:id', editAnnouncement);
router.delete('/delete/:id', editAnnouncement);

module.exports = router;
