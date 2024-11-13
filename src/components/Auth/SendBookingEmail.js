// sendBookingEmail.js
const nodemailer = require('nodemailer');

const sendBookingConfirmation = async (bookingDetails) => {
  const { userEmail, userName, providerName, bookingDate, timeAvailability, address } = bookingDetails;

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your SMTP service provider
    auth: {
      user: 'your-email@gmail.com', // replace with your email
      pass: 'your-email-password' // replace with your email password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: userEmail, // Recipient email
    subject: 'Booking Confirmation',
    html: `
      <h3>Booking Confirmation</h3>
      <p>Dear ${userName},</p>
      <p>Your booking with <strong>${providerName}</strong> has been confirmed.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Date: ${bookingDate}</li>
        <li>Time: ${timeAvailability}</li>
        <li>Address: ${address}</li>
      </ul>
      <p>Thank you for choosing our services!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
  }
};

module.exports = sendBookingConfirmation;
