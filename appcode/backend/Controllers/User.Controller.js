const User = require("../Models/User.Model");
var bcrypt = require("bcryptjs");
const Role = require("../Models/Role.Model");
const { Slot, ResponseModel } = require("../DataModels/DataModels");

exports.addUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
    isActive: req.body.isActive,
    isDeleted: req.body.isDeleted,
    password: bcrypt.hashSync(req.body.password, 8),
    parentId: req.body.parentId ? req.body.parentId : 0,
    securityCode: 0,
  });

  user.save((err, user) => {
    if (err)
      return res
        .status(500)
        .send(new ResponseModel(false, "Internal Error Occurred.", err ));

    if (req.body.userRole) {
      Role.find({ name: { $in: req.body.userRole } }, (err, roles) => {
        if (err) {
          return res.status(500).send(new ResponseModel(false, "Internal Error Occurred.", err ));
        }
        user.roles = roles.map((_) => _._id);

        if (req.body.parkingLot) {
          let slotInfos = [];
          for (let i = 1; i <= req.body.parkingLot.slotCount; i++) {
            slotInfos.push(new Slot(i, false, "", "", "", null, 0));
          }
          const parkingPlace = new ParkingPlace({
            userId: user.userId,
            slotCount: req.body.parkingLot.slotCount,
            location: req.body.parkingLot.location,
            slotInfo: slotInfos,
          });
          parkingPlace.save((err, data) => {
            if (err) {
              return res.status(500).send(new ResponseModel(false, "Internal Error Occurred.", err ));
            }
            user.parkingLot = data._id;

            user.save((err) => {
              if (err) {
                return res.status(500).send(new ResponseModel(false, "Internal Error Occurred.", err ));
              }
              return res.status(201).send(new ResponseModel(true, "User added successfully!"));
            });
          });
        }
      });
    }
  });
};

exports.getUsers = (req, res) => {
  let user = {};
  let users = [];
  User.find({ isDeleted: false })
    .populate("userRole")
    .populate("parkingLot")
    .then((data) => {
      data.forEach((item) => {
        user = {
          userId: item.userId,
          name: item.name,
          email: item.email,
          contactNumber: item.contactNumber,
          isActive: item.isActive,
          isDeleted: item.isDeleted,
          parentId: item.parentId,
          userRole: item.roles[0].name,
          parkingLot: user.parkingLot[0],
        };
        users.push(user);
      });
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send(new ResponseModel(false, "Some error occurred while retrieving the users.", err ));
    });
};

exports.getUserByUserId = (req, res) => {
  const userId = req.params.userid;
  console.log(req.query);
  const condition = userId
    ? {
        userId: userId,
        isDeleted: false,
      }
    : {};

  User.find(condition)
    .populate("userRole")
    .populate("parkingLot")
    .then((data) => {
      if (!data) {
        res.status(404).send(new ResponseModel(false, "Unable to find a user for given user id: " + userId + "." ));
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(new ResponseModel(false, "Some error occurred while retrieving the User.", err ));
    });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userid;

  User.findOneAndUpdate(
    { userId: userId },
    { $set: { isActive: false, isDeleted: true } }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send(new ResponseModel(false, "Unable to find a user for given user id: " + userId + "." ));
      } else
        res
          .status(200)
          .send(new ResponseModel(true, "User deleted successfully!"));
    })
    .catch((err) => {
      res.status(500).send(new ResponseModel(false, "Some error occurred while retrieving the User.", err ));
    });
};

exports.updateUser = (req, res) => {
  const userId = req.body.userId;
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
  });

  User.findOneAndUpdate({ userId: userId, isDeleted: false }, user, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send(new ResponseModel(false, "Unable to find a user for given user id: " + userId + "." ));
      } else
        res
          .status(200)
          .send(new ResponseModel(true, "User updated successfully!"));
    })
    .catch((err) => {
      res.status(500).send(new ResponseModel(false, "Some error occurred while retrieving the User.", err ));
    });
};

exports.activateUser = (req, res) => {
  const userId = req.params.userId;
  User.findOneAndUpdate(
    { userId: userId, isDeleted: false },
    { $set: { isActive: true } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send(new ResponseModel(false, "Unable to find a user for given user id: " + userId + "." ));
      } else
        res
          .status(200)
          .send(new ResponseModel(true, "User activated successfully!"));
    })
    .catch((err) => {
      res.status(500).send(new ResponseModel(false, "Some error occurred while retrieving the User.", err ));
    });
};

exports.deactivateUser = (req, res) => {
  const userId = req.params.userId;
  User.findOneAndUpdate(
    { userId: userId, isDeleted: false },
    { $set: { isActive: false } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send(new ResponseModel(false, "Unable to find a user for given user id: " + userId + "." ));
      } else
        res
          .status(200)
          .send(new ResponseModel(true, "User deactivated successfully!"));
    })
    .catch((err) => {
      res.status(500).send(new ResponseModel(false, "Some error occurred while retrieving the User.", err ));
    });
};

exports.getUsersByParentId = (req, res) => {
  const parentId = req.params.parentid;
  let user = {};
  let users = [];
  User.find({ parentId: parentId, isDeleted: false })
    .populate("userRole")
    .populate("parkingLot")
    .then((data) => {
      data.forEach((item) => {
        user = {
          userId: item.userId,
          name: item.name,
          email: item.email,
          contactNumber: item.contactNumber,
          isActive: item.isActive,
          isDeleted: item.isDeleted,
          parentId: item.parentId,
          userRole: item.roles[0].name,
          parkingLot: user.parkingLot[0],
        };
        users.push(user);
      });
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send(new ResponseModel(false, "Some error occurred while retrieving the Users.", err ));
    });
};

exports.findAllActive = (req, res) => {
  User.find({ _active: true })
    // .populate('roles')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};
