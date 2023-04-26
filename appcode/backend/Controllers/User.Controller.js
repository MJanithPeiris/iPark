const User = require("../Models/User.Model");
var bcrypt = require("bcryptjs");
const Role = require("../Models/Role.Model");
const s = require("../Controllers/ParkingLot.Controller");
const ParkingLot = require("../Models/ParkingLot.Model");
const { Slot, ResponseModel } = require("../DataModels/DataModels");
const SendMail = require("../SupportService/SendMail");

exports.addUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      isActive: true,
      isDeleted: false,
      password: bcrypt.hashSync(req.body.password, 8),
      parentId: req.body.parentId ? req.body.parentId : 0,
      securityCode: 0,
    });

    const addedUser = await user.save();

    if (req.body.parkingLot) {
      let slotInfos = [];
      for (let i = 1; i <= req.body.parkingLot.slotCount; i++) {
        slotInfos.push(new Slot(i, false, "", "", "", null, 0));
      }
      const parkingLot = new ParkingLot({
        userId: addedUser.userId,
        slotCount: req.body.parkingLot.slotCount,
        location: req.body.parkingLot.location,
        slotInfo: slotInfos,
      });
      const parking = await parkingLot.save();
      addedUser.parkingLot = parking._id;
      await addedUser.save();
    }

    if (req.body.userRole) {
      const roles = await Role.find({ name: { $in: req.body.userRole } });
      addedUser.userRole = roles.map((role) => role._id);
      await addedUser.save();
      SendMail.sendMail(
        user.email,
        "Welcome to iPark",
        "Login credentials for iPark:\n Email: " +
          user.email +
          "\n Password: " +
          req.body.password +
          "\n\n Thank you for joining with iPark!"
      );
    }

    return res
      .status(201)
      .send(new ResponseModel(true, "User added successfully!", addedUser));
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(new ResponseModel(false, "Internal Error Occurred.", err));
  }
};

exports.getUsers = async (req, res) => {
  let users = [];

  try {
    const data = await User.find({ isDeleted: false })
      .populate("userRole")
      .populate("parkingLot");

    for (const item of data) {
      let subUsers = [];

      if (item.userRole[0]?.name === "Company") {
        const subData = await User.find({
          parentId: item.userId,
          isDeleted: false,
        })
          .populate("userRole")
          .populate("parkingLot");

        for (const subUser of subData) {
          subUsers.push({
            userId: subUser.userId,
            name: subUser.name,
            email: subUser.email,
            contactNumber: subUser.contactNumber,
            isActive: subUser.isActive,
            isDeleted: subUser.isDeleted,
            parentId: subUser.parentId,
            userRole: subUser.userRole[0]?.name,
            parkingLot: subUser.parkingLot[0] || [],
          });
        }
      }

      const user = {
        userId: item.userId,
        name: item.name,
        email: item.email,
        contactNumber: item.contactNumber,
        isActive: item.isActive,
        isDeleted: item.isDeleted,
        parentId: item.parentId,
        userRole: item.userRole[0]?.name,
        parkingLot: item.parkingLot[0] || [],
        subUsers: subUsers,
      };

      users.push(user);
    }

    return res.status(200).send(users);
  } catch (err) {
    return res
      .status(500)
      .send(
        new ResponseModel(
          false,
          "Some error occurred while retrieving the users.",
          err
        )
      );
  }
};

exports.getUserByUserId = async (req, res) => {
  const userId = req.params.userid;
  const condition = userId
    ? {
        userId: userId,
        isDeleted: false,
      }
    : {};

  // User.find(condition)
  //   .populate("userRole")
  //   .populate("parkingLot")
  //   .then((data) => {
  //     if (!data) {
  //       return res
  //         .status(404)
  //         .send(
  //           new ResponseModel(
  //             false,
  //             "Unable to find a user for given user id: " + userId + "."
  //           )
  //         );
  //     }

  //     const user = {
  //       userId: data[0].userId,
  //       name: data[0].name,
  //       email: data[0].email,
  //       contactNumber: data[0].contactNumber,
  //       isActive: data[0].isActive,
  //       isDeleted: data[0].isDeleted,
  //       parentId: data[0].parentId,
  //       userRole: data[0].userRole[0]?.name,
  //       parkingLot: data[0].parkingLot[0] ? data[0].parkingLot[0] : [],
  //     };
  //     return res.status(200).send(user);
  //   })
  //   .catch((err) => {
  //     return res
  //       .status(500)
  //       .send(
  //         new ResponseModel(
  //           false,
  //           "Some error occurred while retrieving the User.",
  //           err
  //         )
  //       );
  //   });

    try {
      const data = await User.findOne(condition)
        .populate("userRole")
        .populate("parkingLot");
        
        let subUsers = [];
        if (data.userRole[0]?.name === "Company") {
          const subData = await User.find({
            parentId: data.userId,
            isDeleted: false,
          })
            .populate("userRole")
            .populate("parkingLot");
  
          for (const subUser of subData) {
            subUsers.push({
              userId: subUser.userId,
              name: subUser.name,
              email: subUser.email,
              contactNumber: subUser.contactNumber,
              isActive: subUser.isActive,
              isDeleted: subUser.isDeleted,
              parentId: subUser.parentId,
              userRole: subUser.userRole[0]?.name,
              parkingLot: subUser.parkingLot[0] || [],
            });
          }
        }
  
        const user = {
          userId: data.userId,
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          isActive: data.isActive,
          isDeleted: data.isDeleted,
          parentId: data.parentId,
          userRole: data.userRole[0]?.name,
          parkingLot: data.parkingLot[0] || [],
          subUsers: subUsers,
        };
      
      return res.status(200).send(user);

    } catch (err) {
      return res
        .status(500)
        .send(
          new ResponseModel(
            false,
            "Some error occurred while retrieving the users.",
            err
          )
        );
    }
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userid;

  User.findOneAndUpdate(
    { userId: userId },
    { $set: { isActive: false, isDeleted: true } }
  )
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            new ResponseModel(
              false,
              "Unable to find a user for given user id: " + userId + "."
            )
          );
      } else
        res
          .status(200)
          .send(new ResponseModel(true, "User deleted successfully!", data));
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          new ResponseModel(
            false,
            "Some error occurred while retrieving the User.",
            err
          )
        );
    });
};

exports.updateUser = (req, res) => {
  const userId = req.body.userId;
  const condition = userId
    ? {
        userId: userId,
        isDeleted: false,
      }
    : {};

  User.findOne(condition)
    .populate("userRole")
    .populate("parkingLot")
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send(
            new ResponseModel(
              false,
              "Unable to find a user for given user id: " + userId + "."
            )
          );
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.contactNumber = req.body.contactNumber;
      if (req.body.parkingLot) {
        s.updateParkingSlot(req, res);
      }
      User.findOneAndUpdate(condition, user, { useFindAndModify: false })
        .then((data) => {
          return res
            .status(200)
            .send(new ResponseModel(true, "User updated successfully!", data));
        })
        .catch((err) => {
          return res
            .status(500)
            .send(
              new ResponseModel(
                false,
                "Some error occurred while retrieving the User.",
                err
              )
            );
        });
    });
};

exports.activateUser = (req, res) => {
  const userId = req.params.userid;
  User.findOneAndUpdate(
    { userId: userId, isDeleted: false },
    { $set: { isActive: true } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send(
            new ResponseModel(
              false,
              "Unable to find a user for given user id: " + userId + "."
            )
          );
      } else
        return res
          .status(200)
          .send(new ResponseModel(true, "User activated successfully!", data));
    })
    .catch((err) => {
      return res
        .status(500)
        .send(
          new ResponseModel(
            false,
            "Some error occurred while retrieving the User.",
            err
          )
        );
    });
};

exports.deactivateUser = (req, res) => {
  const userId = req.params.userid;
  User.findOneAndUpdate(
    { userId: userId, isDeleted: false },
    { $set: { isActive: false } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send(
            new ResponseModel(
              false,
              "Unable to find a user for given user id: " + userId + "."
            )
          );
      } else
        return res
          .status(200)
          .send(
            new ResponseModel(true, "User deactivated successfully!", data)
          );
    })
    .catch((err) => {
      return res
        .status(500)
        .send(
          new ResponseModel(
            false,
            "Some error occurred while retrieving the User.",
            err
          )
        );
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
          userRole: item.userRole[0]?.name,
          parkingLot: item.parkingLot[0] ? item.parkingLot[0] : [],
        };
        users.push(user);
      });
      return res.status(200).send(users);
    })
    .catch((err) => {
      return res
        .status(500)
        .send(
          new ResponseModel(
            false,
            "Some error occurred while retrieving the Users.",
            err
          )
        );
    });
};

exports.findAllActive = (req, res) => {
  User.find({ _active: true })
    // .populate('roles')
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};
