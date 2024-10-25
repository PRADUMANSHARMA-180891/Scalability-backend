const SurveyQuestion = require("../models/survey/QuestionModels");
const Survey = require("../models/survey/SurveyModels");
const MySurveyResponse = require("../models/survey/SurveyResponseModels");
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
// const createSurveyAndQuestion = async (req, res) => {
//   const {
//     surveyName,
//     createdByUserId,
//     sendToAll,
//     anonymous,
//     scheduledDelivery,
//     sendSurveyOn, // New field
//     closeSurveyAt,
//     emailReminders,
//     emailSubject,
//     emailMessage,
//     questions,
//   } = req.body;

//   try {
//     // Create the survey with associated questions in a single transaction
//     const newSurvey = await Survey.create(
//       {
//         surveyName,
//         createdByUserId,
//         sendToAll,
//         anonymous,
//         scheduledDelivery,
//         sendSurveyOn, // Include the new field
//         closeSurveyAt,
//         emailReminder1: emailReminders[0] || null,
//         emailReminder2: emailReminders[1] || null,
//         emailReminder3: emailReminders[2] || null,
//         emailSubject,
//         emailMessage,
//         SurveyQuestions: questions, // Include the questions here
//       },
//       {
//         include: [SurveyQuestion], // This tells Sequelize to also create the associated questions
//       }
//     );

//     // Initialize variables
//     let recipientsCount = 0;
//     let emailAddresses = [];
//     let users = []; // Make sure 'users' is always declared
     

//     if (sendToAll) {
//       const users = await User.findAll({ attributes: ['email'] });
//       const emailAddresses = users.map((user) => user.email);

//       // Set up the email transporter using nodemailer
//       const transporter = nodemailer.createTransport({
//         service: 'gmail', // e.g., 'gmail'
//         auth: {
//           user: 'growthh.in@gmail.com',
//           pass: 'fsee idmx dcyf vzhj',
//         },
//       });

//       // Email options
//       const mailOptions = {
//         from: 'growthh.in@gmail.com',
//         to: emailAddresses,
//         subject: emailSubject,
//         text: emailMessage,
//         html: `<p>${emailMessage}</p>`, // You can use HTML for a more formatted email
//       };

//       // Send the email to all users
//       await transporter.sendMail(mailOptions);
//     }

//     res.status(201).json({
//       message: 'Survey and questions created successfully',
//       survey: newSurvey,
//     });
//   } catch (error) {
//     console.error('Error creating survey:', error);
//     res.status(500).json({
//       message: 'Failed to create survey',
//       error: error.message,
//     });
//   }
// };
const createSurveyAndQuestion = async (req, res) => {
  const {
    surveyName,
    createdByUserId,
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
    // Initialize variables for recipients
    let recipientsCount = 0;
    let emailAddresses = [];
    let users = []; // Store user data

    // Fetch all user emails if sendToAll is true
    if (sendToAll) {
      users = await User.findAll({ attributes: ['email', 'id'] });
      emailAddresses = users.map((user) => user.email);
      recipientsCount = emailAddresses.length; // Count the number of recipients
    }

    // Create the survey with associated questions in a single transaction
    const newSurvey = await Survey.create(
      {
        surveyName,
        createdByUserId,
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
        recipientsCount, // Store the number of recipients
        respondedCount: 0, // Initialize with 0 since no one has responded yet
      },
      {
        include: [SurveyQuestion], // This tells Sequelize to also create the associated questions
      }
    );

    // Send email if there are recipients
    if (recipientsCount > 0) {
      // Set up the email transporter using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'growthh.in@gmail.com',
          pass: 'fsee idmx dcyf vzhj',
        },
      });

      // Send an email to each recipient with a personalized survey link
      for (const user of users) {
        const responseLink = `http://localhost:3000/survey/${newSurvey.id}/respond?userId=${user.id}`;
        const personalizedEmailMessage = `
          <p>${emailMessage}</p>
          <p>Click <a href="${responseLink}">here</a> to respond to the survey.</p>
        `;

        // Email options
        const mailOptions = {
          from: 'growthh.in@gmail.com',
          to: user.email,
          subject: emailSubject,
          html: personalizedEmailMessage, // HTML content with the response link
        };

        try {
          // Send the email
          await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${user.email}`);
        } catch (emailError) {
          console.error(`Error sending email to ${user.email}:`, emailError);
        }
      }
    }
    // Respond with success and the created survey
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
const getSurveyData = async (req, res) => {
  try {
    // Fetch surveys and include the 'User' who created each survey
    const surveyData = await Survey.findAll({
      include: [
        {
          model: User, // Include creator's user data
          attributes: ['id', 'name', 'email'],
        },
        {
          model: SurveyQuestion,
          model: MySurveyResponse, // Include survey responses
          include: [
            {
              model: User, // Include user data for the response
              attributes: ['id', 'name', 'email'], // Include details of the user who submitted the response
            }
          ],
        }
      ],
      
    });

    if (!surveyData || surveyData.length === 0) {
      return res.status(404).json({ message: "No survey data found" });
    }

    res.status(200).json(surveyData);
  } catch (error) {
    console.error("Error fetching survey data:", error); // Log the error for debugging
    res.status(500).json({ message: "Error while fetching survey data", error });
  }
};


const resendSurveyEmails = async (req, res) => {
    const { email, surveyName } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "growthh.in@gmail.com",
                pass: 'fsee idmx dcyf vzhj',
            },
        });

        const mailOptions = {
            from: 'growthh.in@gmail.com',
            to: email,
            subject: `Reminder to complete the survey: ${surveyName}`,
            text: `Dear recipient, please take a few minutes to complete the survey ${surveyName}. Your feedback is valuable!`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send emails' });
    }
};

const getSurveyDataById = async (req, res) => {
  try {
    const { id } = req.params; // Get the survey ID from the request parameters
    
    // Assuming you're using Sequelize ORM:
    const survey = await Survey.findByPk(id, {
      include: [User,SurveyQuestion,MySurveyResponse], // Include related models if necessary (e.g., created by user)
    });

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    // Return the survey data
    return res.status(200).json(survey);

  } catch (error) {
    console.error("Error fetching survey by ID:", error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// delete survey 

const deleteSurvey = async (req, res) => {
  try {
    const surveyId = req.params.id; // Get the survey ID from the request parameters

    // Check if the survey exists
    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    // Delete the survey
    await survey.destroy();

    // Respond with success message
    return res.status(200).json({ message: 'Survey deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the survey' });
  }
};
// close survey
const closeSurvey = async(req,res)=>{
  try {
    const { id } = req.params;

    // Find survey by id
    const survey = await Survey.findByPk(id);
    if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
    }

    // Update survey status to 'closed'
    survey.status = 'closed';
    await survey.save();

    return res.status(200).json({
        message: 'Survey closed successfully',
        survey,
    });
} catch (error) {
    return res.status(500).json({ message: 'Server error', error });
}
}

// reopen survey
const reOpenSurvey = async(req,res)=>{
  try {
    const { id } = req.params;

    // Find survey by id
    const survey = await Survey.findByPk(id);
    if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
    }

    // Update survey status to 'open'
    survey.status = 'open';
    await survey.save();

    return res.status(200).json({
        message: 'Survey reopened successfully',
        survey,
    });
} catch (error) {
    return res.status(500).json({ message: 'Server error', error });
}
}

// edit survey profile 
const editSurveyAndQuestions = async (req, res) => {
  const {
    surveyName,
    sendToAll,
    anonymous,
    scheduledDelivery,
    sendSurveyOn,
    closeSurveyAt,
    emailReminders,
    emailSubject,
    emailMessage,
    questions,
  } = req.body;

  const { id } = req.params;

  try {
    // Fetch the existing survey by its ID
    const survey = await Survey.findByPk(id, {
      include: [SurveyQuestion], // Include the associated questions
    });

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    // Update the survey fields
    survey.surveyName = surveyName;
    survey.sendToAll = sendToAll;
    survey.anonymous = anonymous;
    survey.scheduledDelivery = scheduledDelivery;
    survey.sendSurveyOn = sendSurveyOn;
    survey.closeSurveyAt = closeSurveyAt;
    survey.emailReminder1 = emailReminders[0] || null;
    survey.emailReminder2 = emailReminders[1] || null;
    survey.emailReminder3 = emailReminders[2] || null;
    survey.emailSubject = emailSubject;
    survey.emailMessage = emailMessage;

    // Update questions
    await Promise.all(questions.map(async (question) => {
      const { surveyId, text, type, required } = question;

      if (id) {
        // If question ID exists, update the question
        const existingQuestion = await SurveyQuestion.findByPk(id);
        if (existingQuestion) {
          existingQuestion.text = text;
          existingQuestion.type = type;
          existingQuestion.surveyId = surveyId;
          existingQuestion.required = required;
          await existingQuestion.save();
        }
      } else {
        // If question ID doesn't exist, create a new question
        await SurveyQuestion.create({
          surveyId,
          text,
          type,
          required
        });
      }
    }));

    // Save survey updates
    await survey.save();

    res.status(200).json({
      message: 'Survey updated successfully',
      survey,
    });

  } catch (error) {
    console.error('Error updating survey:', error);
    res.status(500).json({
      message: 'Failed to update survey',
      error: error.message,
    });
  }
};

// send response
const SurveyResponse = async (req, res) => {
  const { surveyId, userId, responseText } = req.body;

  try {
    // Check if the user has already responded to this survey
    const existingResponse = await MySurveyResponse.findOne({
      where: { surveyId, userId },
    });

    if (existingResponse) {
      return res.status(400).json({ message: 'You have already responded to this survey.' });
    }

    // Save the response in the database
    await MySurveyResponse.create({
      surveyId,
      userId,
      responseText,
    });

    // Increment the responded count in the survey
    await Survey.increment('respondedCount', { where: { id: surveyId } });

    return res.status(201).json({ message: 'Response submitted successfully' });
  } catch (error) {
    console.error('Error submitting survey response:', error);
    return res.status(500).json({ message: 'Error submitting response', error: error.message });
  }
};

  module.exports = {createSurvey, createQuestion, createSurveyAndQuestion, getSurveyData,resendSurveyEmails, getSurveyDataById, deleteSurvey, closeSurvey, reOpenSurvey, editSurveyAndQuestions, SurveyResponse}