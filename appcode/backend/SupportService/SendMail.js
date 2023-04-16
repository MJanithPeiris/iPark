var nodemailer = require("nodemailer");
const config = require("../Config/Mail.Config");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.sender,
    pass: config.password,
  },
});

exports.sendMail = (receiver, subject, text) => {
  let mailOptions = {
    from: "janith20005@gmail.com",
    to: receiver,
    subject: subject,
    text:
      " Hello sir/madam, \n " +
      text +
      "\n\n\n This is an auto reply from iPark",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};