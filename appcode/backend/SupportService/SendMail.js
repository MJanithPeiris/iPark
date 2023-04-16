var nodemailer = require("nodemailer");
const config = require("../Config/Mail.Config");

exports.sendMail = (receiver, subject, text) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.sender,
      pass: config.password,
    },
  });

  const mailOptions = {
    from: "janith20005@gmail.com",
    to: receiver,
    subject: subject,
    text:
      " Hello sir/madam, \n " +
      text +
      "\n\n\n This is an auto reply from iPark",
  };

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};