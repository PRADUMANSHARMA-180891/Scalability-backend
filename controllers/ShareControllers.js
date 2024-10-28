// const Share = require('../models/Share');
// const Company = require('../models/Company'); // Assuming you have a Company model
const nodemailer = require('nodemailer');
const Share = require('../models/Share/ShareModels');

const shareCompany = async (req, res) => {
  try {
    const { email, message } = req.body;


    // Create a new share record
    const newShare = await Share.create({ email, message });

    // Set up email transporter with nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'growthh.in@gmail.com',
        pass: 'fsee idmx dcyf vzhj',
      },
    });

    // Define mail options
    const mailOptions = {
      from: 'growthh.in@gmail.com',
      to: email,
      subject: `Company Information`,
      text: `
        You have been shared details for the company
        ${message ? `Message: ${message}` : ''}
        Phone: "9006874711"
        Website: "website
        Year Established: "dwdwj"
        Business Type: "bussness"
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: 'Company shared successfully', newShare });
  } catch (error) {
    console.error('Error sharing company:', error);
    return res.status(500).json({ error: 'Failed to share company' });
  }
};

module.exports = { shareCompany };
