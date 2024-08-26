// nodemailerConfig.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this to your email service provider
    auth: {
        user: 'growthh.in@gmail.com', // Your email address
        pass: 'fsee idmx dcyf vzhj', // Your email password
    },
});

module.exports = transporter;
