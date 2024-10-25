const Enps = require("../models/enps/EnpsModels");
const SurveyResponse = require("../models/enps/SurveyResponseModels");
const User = require("../models/UserModels");
const nodemailer = require('nodemailer');

const createEnpsSurvey = async (req, res) => {
  try {
    const {
      surveyName,
      sendToAll,
      scheduledDelivery,
      closeSurveyAt,
      emailReminder1,
      emailReminder2,
      emailReminder3,
      emailSubject,
      emailMessage,
      status,
      createdByUserId
    } = req.body;

    // Initialize variables
    let recipientsCount = 0;
    let emailAddresses = [];
    let users = []; // Make sure 'users' is always declared

    if (sendToAll) {
      // Fetch all users' emails
      users = await User.findAll({ attributes: ['email', 'id'] }); // Fetch emails and user ids
      emailAddresses = users.map((user) => user.email);
      recipientsCount = emailAddresses.length; // Number of recipients
    }

    // Create the new survey
    const newSurvey = await Enps.create({
      surveyName,
      sendToAll,
      scheduledDelivery,
      closeSurveyAt,
      emailReminder1,
      emailReminder2,
      emailReminder3,
      emailSubject,
      emailMessage,
      createdByUserId,
      status,
      recipientsCount, // Store the number of recipients
      respondedCount: 0 // Initially, no one has responded
    });

    // Set up the email transporter using nodemailer
    if (recipientsCount > 0) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'growthh.in@gmail.com',
          pass: 'fsee idmx dcyf vzhj',
        },
      });

      // Send an email to each recipient with a unique response link
      for (const user of users) {
        const responseLink = `http://localhost:3000/enps-survey/${newSurvey.id}/respond?userId=${user.id}`;
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
          await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${user.email}`);
        } catch (emailError) {
          console.error(`Error sending email to ${user.email}:`, emailError);
        }
      }
    }

    return res.status(201).json(newSurvey);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating survey', details: error.message });
  }
};

  // Get all eNPS surveys
  const getAllSurveys = async (req, res) => {
    try {
      const surveys = await Enps.findAll({
        include: [
          {
            model: User, // Include creator's user data
            attributes: ['id', 'name', 'email'],
          },
          {
            model: SurveyResponse, // Include survey responses
            include: [
              {
                model: User, // Include user data for the response
                attributes: ['id', 'name', 'email'], // Include details of the user who submitted the response
              }
            ],
          }
        ],
      });
      return res.status(200).json(surveys);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching surveys', details: error.message });
    }
  };
  
// get enps survey by Id
// Get a specific eNPS survey by ID
const getSurveyById = async (req, res) => {
  try {
    const { id } = req.params;
    const survey = await Enps.findByPk(id, {
      include: [
        {
          model: User, // Include creator's user data
          attributes: ['id', 'name', 'email'],
        },
        {
          model: SurveyResponse, // Include survey responses
          include: [
            {
              model: User, // Include user data for the response
              attributes: ['id', 'name', 'email'], // Include details of the user who submitted the response
            }
          ],
        }
      ],
    });

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    return res.status(200).json(survey);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching survey', details: error.message });
  }
};
 
// delete enps survey
// Delete a specific eNPS survey
const deleteSurvey = async (req, res) => {
  try {
    const { id } = req.params;

    const survey = await Enps.findByPk(id);
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    await survey.destroy();

    return res.status(200).json({ message: 'Survey deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting survey', details: error.message });
  }
};

// close survey
const closeEnpsSurvey = async(req,res)=>{
  try {
    const { id } = req.params;

    // Find survey by id
    // console.log(id,"  closeSurveyid");
    const survey = await Enps.findByPk(id);
    if (!survey) {
        return res.status(404).json({ message: 'Enps Survey not found' });
    }

    // Update survey status to 'closed'
    survey.status = 'closed';
    await survey.save();

    return res.status(200).json({
        message: 'Enps Survey closed successfully',
        survey,
    });
} catch (error) {
    return res.status(500).json({ message: 'Server error', error });
}
}

// reopen survey
const reOpenEnpsSurvey = async(req,res)=>{
  try {
    const { id } = req.params;

    // Find survey by id
    const survey = await Enps.findByPk(id);
    if (!survey) {
        return res.status(404).json({ message: 'Enps Survey not found' });
    }

    // Update survey status to 'open'
    survey.status = 'open';
    await survey.save();

    return res.status(200).json({
        message: 'Enps Survey reopened successfully',
        survey,
    });
} catch (error) {
    return res.status(500).json({ message: 'Server error', error });
}
}

// send response
 const EnpsSurveyResponse = async(req,res)=>{
  const { surveyId, userId, responseText } = req.body;
  try {
    // Save the response in the database (assuming a SurveyResponse model)
    await SurveyResponse.create({
      surveyId,
      userId,
      responseText,
    });

    // Increment the responded count in the survey
    await Enps.increment('respondedCount', { where: { id: surveyId } });

    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting response', error: error.message });
  }
 }

  module.exports = {createEnpsSurvey, getAllSurveys, getSurveyById, deleteSurvey, closeEnpsSurvey, reOpenEnpsSurvey, EnpsSurveyResponse}