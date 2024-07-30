const HelpCategory = require('../models/helpAndFaq/HelpCategoryModels');
const Question = require('../models/helpAndFaq/HelpQuestion');

const createHelpCategoryWithQuestions = async (req, res) => {
  try {
    const { name, questions } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    if (!Array.isArray(questions) || questions.some(q => !q)) {
      return res.status(400).json({ message: 'Questions must be a non-empty array of non-null strings' });
    }

    const helpCategory = await HelpCategory.create({ name });
    if (questions && questions.length > 0) {
      const questionData = questions.map(question => ({
        question,
        helpCategoryId: helpCategory.id
      }));
      await Question.bulkCreate(questionData);
    }

    res.status(201).json({ message: 'Help Category and questions created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the Help Category and questions', error });
  }
};

const getAllHelpCategories = async (req, res) => {
  try {
    const helpCategories = await HelpCategory.findAll({
      include: [Question]
    });
    if (!helpCategories) {
      return res.status(404).json({ message: 'Help Category data not found' });
    }
    res.status(200).json(helpCategories);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while fetching category data', error });
  }
};

const searchHelpCategoryByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Name query parameter is required' });
    }

    const helpCategory = await HelpCategory.findOne({
      where: { name },
      include: [Question]
    });

    if (!helpCategory) {
      return res.status(404).json({ message: 'Help Category not found' });
    }

    res.status(200).json(helpCategory);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while searching for the Help Category', error });
  }
};

module.exports = { createHelpCategoryWithQuestions, getAllHelpCategories, searchHelpCategoryByName };
