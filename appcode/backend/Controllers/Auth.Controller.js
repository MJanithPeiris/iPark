var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../Config/Auth.Config");
const SendMail = require("../SupportService/SendMail");
const RandomNumber = require("../SupportService/RandomNumber");
const User = require("../Models/User.Model");
const BlackList = require("../Models/BlackList.Model");
const { ResponseModel } = require("../DataModels/DataModels");

exports.signin = async (req, res) => {
  const condition = req.body
    ? {
        email: req.body.email,
        isActive: true,
        isDeleted: false,
      }
    : {};
  try {
    const user = await User.findOne(condition)
      .populate("userRole", "-__v")
      .populate("parkingLot");

    if (!user) {
      return res
        .status(404)
        .send(
          new ResponseModel(
            false,
            "User Not found or User may be not active or User may be deleted"
          )
        );
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .send(new ResponseModel(false, "Password is invalid!"));
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 64800, // 18 hours
    });

    const authorities = user.userRole.map(
      (role) => `ROLE_${role.name.toUpperCase()}`
    );

    return res.status(200).send({
      response: true,
      id: user._id,
      userId: user.userId,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      isActive: user.isActive,
      isDeleted: user.isDeleted,
      userRole: authorities,
      parentId: user.parentId,
      parkingLot: user.parkingLot[0],
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(new ResponseModel(false, "Internal Error Occurred.", err));
  }
};

exports.signout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).send(new ResponseModel(false, "No token provided!"));

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .send(new ResponseModel(false, "Invalid token provided!"));

    const blackList = new BlackList({
      token: token,
    });
    blackList.save((err) => {
      if (err)
        return res
          .status(500)
          .send(new ResponseModel(false, "Internal Error Occurred.", err));

      return res
        .status(200)
        .send(new ResponseModel(true, "User sign out successfully!"));
    });
  });
};

exports.forgetPassword = async (req, res) => {
  const condition = req.body
    ? {
        email: req.body.email,
        isActive: true,
        isDeleted: false,
      }
    : {};
  const securityCode = RandomNumber.getRandomNumber(6);
  try {
    const user = await User.findOne(condition).exec();
    if (!user) {
      return res
        .status(404)
        .send(new ResponseModel(false, "Invalid email provided!"));
    }
    const data = await User.findOneAndUpdate(condition, {
      $set: { securityCode: securityCode },
    });
    if (!data) {
      return res
        .status(404)
        .send(new ResponseModel(false, "Email not found: " + condition?.email));
    }
    // if (
      SendMail.sendMail(
        user.email,
        "Password reset code for iPark",
        "Your security code for reset password is: " + securityCode
      );
    // ) {
      // return res
      //   .status(500)
      //   .send(
      //     new ResponseModel(
      //       false,
      //       "Unable to send an email to: " + condition?.email
      //     )
      //   );
    // }

    return res
      .status(200)
      .send(new ResponseModel(true, "Email sent successfully!"));
  } catch (err) {
    return res
      .status(500)
      .send(new ResponseModel(false, "Internal Error Occurred.", err));
  }
};

exports.isValidateSecurityCode = async (req, res) => {
  const securityCode = req.body.securityCode;
  const condition = req.body
    ? {
        email: req.body.email,
        isActive: true,
        isDeleted: false,
      }
    : {};

  try {
    const user = await User.findOne(condition).exec();
    if (!user) {
      return res
        .status(404)
        .send(new ResponseModel(false, "Invalid email provided!"));
    }
    if (user.securityCode !== securityCode) {
      return res
        .status(401)
        .send(new ResponseModel(false, "Invalid security code provided!"));
    }
    return res
      .status(200)
      .send(new ResponseModel(true, "Security code is valid!"));
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(new ResponseModel(false, "Internal Error Occurred.", err));
  }
};

exports.resetPassword = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOneAndUpdate(
    { email: email },
    { $set: { password: bcrypt.hashSync(password, 8) } }
  )
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(new ResponseModel(false, "Email not found: " + email));
      } else
        res
          .status(200)
          .send(new ResponseModel(true, "Password updated successfully!"));
    })
    .catch((err) => {
      res
        .status(500)
        .send(new ResponseModel(false, "Unable to update the password!", err));
    });
};
