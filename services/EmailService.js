const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetEmail = (token, email, swedish) => {
  let text;
  let subject;
  swedish
    ? (text =
        "Du får detta milet för att du(eller någon annan) har önskat att återställa ditt lösenord på ditt konto. \n" +
        "Var vänlig och klicka på följande länk eller klistra in den i din webläsare för att fullfölja processen inom en timme efter att du mottagit mailet. \n" +
        process.env.MAIL_LINK_URL +
        token +
        "\n" +
        "Om du inte önskade detta kan du ignorera detta mail och ditt lösenord kommer vara oförändrat.")
    : (text =
        "You are recieving this because you (or someone else) have requested the reset of the password for your account. \n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of recieving it. \n" +
        process.env.MAIL_LINK_URL +
        token +
        "\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.");
  swedish
    ? (subject = "Återställande av lösenord")
    : (subject = "Link to reset password");
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: subject,
    text: text,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
module.exports = { sendResetEmail };
