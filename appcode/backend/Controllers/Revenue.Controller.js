const Revenue = require("../Models/Revenue.Model");
const User = require("../Models/User.Model");
const { ResponseModel } = require("../DataModels/DataModels");

exports.getRevenueInfo = (req, res) => {
  const userId = req.params.userid;
  const condition = userId ? { userId: userId } : {};
  return Revenue.find(condition)
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send(
            new ResponseModel(
              false,
              "revenue place not found for user id: " + userId + "."
            )
          );
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res
        .status(500)
        .send(new ResponseModel(false, "Internal Error Occurred.", err));
    });
};

exports.addRevenue = (req, res) => {
  const revenue = new Revenue({
    userId: req.body.userId,
    date: new Date().toJSON().slice(0, 10),
    amount: req.body.amount,
  });
  revenue.save((err, data) => {
    if (err) {
      return res
        .status(500)
        .send(new ResponseModel(false, "Internal Error Occurred.", err));
    } else {
      return res
        .status(201)
        .send(new ResponseModel(true, "Revenue added successfully!", data));
    }
  });
};

exports.getRevenueByParentId = async (req, res) => {
  const parentId = req.params.parentid;
  let revenueInfo = [];

  const subUsers = await User.find({ parentId: parentId }).populate("parkingLot");
  console.log(subUsers);

  for (let i = 0; i < subUsers.length; i++) {
    console.log(subUsers[i].userId);
    console.log(subUsers[i].parkingLot);
    let amount = 0;

    const condition = { userId: subUsers[i].userId }
    if(req.body.fromDate && req.body.toDate){
      condition.date = { $gte: req.body.fromDate, $lte: req.body.toDate };
    }
    const revenue = await Revenue.find(condition);

    for (let j = 0; j < revenue.length; j++) {
      amount += revenue[j].amount;
    }

    revenueInfo.push({
      userId: subUsers[i].userId,
      name: subUsers[i].name,
      email: subUsers[i].email,
      contactNumber: subUsers[i].contactNumber,
      isActive: subUsers[i].isActive,
      isDeleted: subUsers[i].isDeleted,
      parentId: subUsers[i].parentId,
      location: subUsers[i].parkingLot[0]?.location,
      slotCount: subUsers[i].parkingLot[0]?.slotCount,
      totalRevenue: amount,
    });
  }

  console.log(revenueInfo);
  return res.send(revenueInfo);
};
