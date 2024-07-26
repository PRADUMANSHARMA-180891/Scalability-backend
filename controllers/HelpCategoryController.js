const HelpCategory = require('../models/helpAndFaq/HelpCategoryModels');
const Question = require('../models/helpAndFaq/HelpQuestion');

const createHelpCategoryWithQuestions = async (req, res) => {
  try {
    const { name, questions } = req.body;
    console.log('Request Body:', req.body);

    // Validate the name
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Validate questions
    if (!Array.isArray(questions) || questions.some(q => !q)) {
      return res.status(400).json({ message: 'Questions must be a non-empty array of non-null strings' });
    }

    const helpCategory = await HelpCategory.create({ name });
    console.log('Help Category Created:', helpCategory);

    if (questions && questions.length > 0) {
      const questionData = questions.map(question => ({
        question,
        helpCategoryId: helpCategory.id
      }));
      console.log('Question Data to be Inserted:', questionData);

      await Question.bulkCreate(questionData);
    }

    res.status(201).json({ message: 'Help Category and questions created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while creating the Help Category and questions', error });
  }
};
// getData
const getAllHelpCategories = async (req, res) => {
    try {
      const helpCategories = await HelpCategory.findAll({
        include: [Question]
      });
      if (!helpCategories) {
        return res.status(404).json({ message: "Help Category data not found" });
      }
      res.status(200).json(helpCategories);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong while fetching category data", error });
    }
  };
module.exports = {createHelpCategoryWithQuestions,getAllHelpCategories};
