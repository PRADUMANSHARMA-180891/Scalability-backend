const express = require("express");
const { updateTags, createCompanyTags, deleteTags, getTags } = require("../controllers/CompanySettingControllers");
const router = express.Router();

router.post('/create',createCompanyTags);
router.get('/get',getTags);
router.put('/update/:id',updateTags);
router.delete('/delete/:id',deleteTags);

module.exports = router;