const express = require("express");
const router = express.Router();
const {createAnnouncement, getAnnouncement} = require("../controllers/createAnnouncementController");


router.post('/create', createAnnouncement);
router.get('/get/:id', getAnnouncement);
module.exports = router;
