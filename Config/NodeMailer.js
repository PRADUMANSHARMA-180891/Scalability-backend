// config/nodemailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service provider
  auth: {
    user: 'growthh.in@gmail.com',
    pass: 'fsee idmx dcyf vzhj',
  },
});

const sendInviteEmail = (to, token) => {
  const mailOptions = {
    from: 'growthh.in@gmail.com',
    to,
    subject: 'Invitation to Join',
    text: `You have been invited to join. Click the link to accept: http://localhost:3000/accept-invite/${token}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendInviteEmail;
