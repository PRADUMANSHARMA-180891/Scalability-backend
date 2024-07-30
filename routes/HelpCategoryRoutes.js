const express = require("express");
const { getAllHelpCategories, createHelpCategoryWithQuestions, searchHelpCategoryByName } = require("../controllers/HelpCategoryController");
const router = express.Router();



router.get('/get',getAllHelpCategories);
router.post('/post',createHelpCategoryWithQuestions);
router.get('/search', searchHelpCategoryByName);


module.exports = router;