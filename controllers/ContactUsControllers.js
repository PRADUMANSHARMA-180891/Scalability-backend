const nodemailer = require('nodemailer');
const ContactUs = require('../models/ContactUs/ContactUsModels');

const submitContactForm = async (req, res) => {
  try {
    const { companyName, email, phone, subject, description } = req.body;

    // Save contact form details to the database
    const newContact = await ContactUs.create({ companyName, email, phone, subject, description });

    // Set up email transporter with nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'growthh.in@gmail.com',
        pass: 'fsee idmx dcyf vzhj', // use an app password for security
      },
    });

    // Define mail options
    const mailOptions = {
      from: 'growthh.in@gmail.com',
      to: email, // where the message should be sent
      subject: `New Contact Request: ${subject}`,
      text: `
        You have received a new contact request.
        
        Company Name: ${companyName}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        
        Description: 
        ${description}
      `,
    };

    // Send email notification
    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: 'Contact form submitted successfully', newContact });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ error: 'Failed to submit contact form' });
  }
};

module.exports = { submitContactForm };
