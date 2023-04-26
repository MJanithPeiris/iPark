const jwt = require("jsonwebtoken");
const config = require("../Config/Auth.Config");
const User = require("../Models/User.Model");
const Role = require("../Models/Role.Model");
const BlackList = require("../Models/BlackList.Model");
const { ResponseModel } = require("../DataModels/DataModels");

verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .send(new ResponseModel(false, "No token provided!"));
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send(new ResponseModel(false, "Unauthorized!" ));
    }

    BlackList.find({ token: token })
      .then((data) => {
        if (data.length != 0)
          return res
            .status(401)
            .send(new ResponseModel(false, "Unauthorized!" ));

        req.userId = decoded.id;
        next();
      })
      .catch((err) => {
        return res.status(500).send(new ResponseModel(false,"Some error occurred while authorizing.",
          err,
        ));
      });
  });
};

isAuthorized = (roles) => {
  return (req, res, next) => {
    User.find({ _id: req.userId })
      .populate("userRole")
      .exec((err, user) => {
        if (err) {
          return res
            .status(500)
            .send(new ResponseModel(false, "Internal Error Occurred", err ));
        }
        Role.find({ _id: { $in: user[0]?.userRole } }, (err, userRoles) => {
          if (err) {
            return res
              .status(500)
              .send(new ResponseModel(false, "Internal Error Occurred", err ));
          }

          for (let i = 0; i < roles.length; i++) {
            if (userRoles.some((role) => role.name === roles[i])) {
              next();
              return;
            }
          }

          return res
            .status(403)
            .send(new ResponseModel(false,
             "Require " + roles.join(" or ") + " role(s)!",
            ));
        });
      });
  };
};

const authJwt = {
  verifyToken,
  isAuthorized,
};

module.exports = authJwt;
