const Revenue = require("../Models/Revenue.Model");
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
