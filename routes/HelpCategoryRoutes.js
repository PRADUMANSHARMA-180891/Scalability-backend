const express = require("express");
const { getAllHelpCategories, createHelpCategoryWithQuestions } = require("../controllers/HelpCategoryController");
const router = express.Router();



router.get('/get',getAllHelpCategories);
router.post('/post',createHelpCategoryWithQuestions);


module.exports = router;