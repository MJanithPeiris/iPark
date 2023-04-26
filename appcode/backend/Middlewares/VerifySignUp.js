const db = require("../Models/index");
const ROLES = db.ROLES;
const User = require("../Models/User.Model");
const { ResponseModel } = require("../DataModels/DataModels");

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // if (err)
      //   return res
      //     .status(500)
      //     .send({ response: false, message: "Internal Error Occurred", err });

      if (user)
        return res.status(400).send(new ResponseModel(false,
           "Failed! Email is already in use!",
        ));

      next();
    }).catch((err) => {
      return res
          .status(500)
          .send(new ResponseModel(false, "Internal Error Occurred", err ));
    });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send(new ResponseModel( false,
          `Failed! Role ${req.body.roles[i]} does not exist!`,
        ));
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
