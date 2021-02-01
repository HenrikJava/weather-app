const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetEmail =  (token, email) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Link to reset password",
    text:
      "You are recieving this because you (or someone else) have requested the reset of the password for your account. \n" +
      "Please click on the following link, or paste this into your browser to complete the process within one hour of recieving it. \n" +
      process.env.MAIL_LINK_URL +
      token +
      "\n" +
      "If you did not request this, please ignore this email and your password will remain unchanged.",
  };
  return new Promise((resolve,reject) => {
    transporter.sendMail(mailOptions, (err,info) => {
        if (err) {
            resolve(false)
        } else {
            resolve(true)
        }
      })
  })
  
  
};
module.exports = { sendResetEmail };
