const SurveyQuestion = require("../models/survey/QuestionModels");
const Survey = require("../models/survey/SurveyModels");
const User = require("../models/UserModels");
const nodemailer = require('nodemailer');

const createSurvey = async (req, res) => {
  try {
    const survey = await Survey.create(req.body);
    res.status(201).json(survey);
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// create survey question

// Controller function to create a new question
const createQuestion = async (req, res) => {
  try {
    const { surveyId, text, type, required } = req.body;

    // Check if the survey exists
    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    // Create the new question
    const question = await SurveyQuestion.create({
      text,
      type,
      required,
      surveyId, // Associate the question with the survey
    });

    return res.status(201).json({
      message: 'Question created successfully',
      question,
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// survey and question creattion at once
const createSurveyAndQuestion = async (req, res) => {
  const {
    surveyName,
    sendToAll,
    anonymous,
    scheduledDelivery,
    sendSurveyOn, // New field
    closeSurveyAt,
    emailReminders,
    emailSubject,
    emailMessage,
    questions,
  } = req.body;

  try {
    // Create the survey with associated questions in a single transaction
    const newSurvey = await Survey.create(
      {
        surveyName,
        sendToAll,
        anonymous,
        scheduledDelivery,
        sendSurveyOn, // Include the new field
        closeSurveyAt,
        emailReminder1: emailReminders[0] || null,
        emailReminder2: emailReminders[1] || null,
        emailReminder3: emailReminders[2] || null,
        emailSubject,
        emailMessage,
        SurveyQuestions: questions, // Include the questions here
      },
      {
        include: [SurveyQuestion], // This tells Sequelize to also create the associated questions
      }
    );

    if (sendToAll) {
      const users = await User.findAll({ attributes: ['email'] });
      const emailAddresses = users.map((user) => user.email);

      // Set up the email transporter using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'gmail'
        auth: {
          user: 'growthh.in@gmail.com',
          pass: 'fsee idmx dcyf vzhj',
        },
      });

      // Email options
      const mailOptions = {
        from: 'growthh.in@gmail.com',
        to: emailAddresses,
        subject: emailSubject,
        text: emailMessage,
        html: `<p>${emailMessage}</p>`, // You can use HTML for a more formatted email
      };

      // Send the email to all users
      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({
      message: 'Survey and questions created successfully',
      survey: newSurvey,
    });
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(500).json({
      message: 'Failed to create survey',
      error: error.message,
    });
  }
};


// get data of survey

module.exports = {createSurvey, createQuestion, createSurveyAndQuestion}