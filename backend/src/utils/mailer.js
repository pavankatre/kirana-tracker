const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your App Password (not your regular password)
  }
});

const sendLowStockAlert = async (itemName, currentQuantity) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `🚨 Low Stock Alert: ${itemName}`,
    text: `The item "${itemName}" has reached a low stock level. Current quantity: ${currentQuantity}. Please restock soon!`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendLowStockAlert };



// const nodemailer = require('nodemailer');

// // Configure the email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Your Gmail address
//     pass: process.env.EMAIL_PASS  // Your Gmail App Password
//   }
// });

// /**
//  * Sends an email alert when stock is low
//  */
// const sendLowStockAlert = async (itemName, currentQuantity, minThreshold) => {
//   try {
//     const mailOptions = {
//       from: `"Kirana Tracker" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL, // Receiver address
//       subject: `🚨 Low Stock Alert: ${itemName}`,
//       html: `
//         <h3>Inventory Alert</h3>
//         <p>The following item has reached its minimum threshold:</p>
//         <ul>
//           <li><strong>Item:</strong> ${itemName}</li>
//           <li><strong>Current Stock:</strong> ${currentQuantity}</li>
//           <li><strong>Threshold Limit:</strong> ${minThreshold}</li>
//         </ul>
//         <p>Please restock this item soon.</p>
//       `
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// module.exports = { sendLowStockAlert };