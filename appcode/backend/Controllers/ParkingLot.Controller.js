const ParkingLot = require("../Models/ParkingLot.Model");
const { Slot, ResponseModel } = require("../DataModels/DataModels");

function findOne(userId, isCreate) {
  const condition = userId ? { userId: userId } : {};
  return ParkingLot.findOne(condition)
    .populate("slotInfo")
    .then((data) => {
      if (!data && !isCreate) {
        throw new Error(`Parking lot is not found for user id: ${userId}`);
      }
      return data;
    })
    .catch((err) => {
      throw new Error(
        `Some error occurred while retrieving parking lot: ${err.message}`
      );
    });
}

exports.getParkingInfo = async (req, res) => {
  try {
    const parking = await findOne(req.params.userid, false);
    return res.status(200).send(parking);
  } catch (err) {
    return res
      .status(500)
      .send(
        new ResponseModel(
          false,
          "Error occurred while retrieving parking lot info.",
          err
        )
      );
  }
};

exports.updateParkingPlace = async (req, res) => {
  const userId = req.body.userId;

  try {
    const parking = await findOne(userId, false);

    let slotInfos = [];
    for (let i = 0; i < req.body.slotCount; ++i) {
      if (i < parking.slotCount) {
        if (parking.slotInfo[i].status == true)
          slotInfos.push(
            new Slot(
              i + 1,
              true,
              parking.slotInfo[i].vehicleNumber,
              parking.slotInfo[i].vehicleType,
              parking.slotInfo[i].contactNumber,
              parking.slotInfo[i].inTime,
              parking.slotInfo[i].pricePerHour
            )
          );
        else slotInfos.push(new Slot(i + 1, false, "", "", "", null, 0));
      } else slotInfos.push(new Slot(i + 1, false, "", "", "", null, 0));
    }

    const parkingPlace = {
      userId: userId,
      slotCount: req.body.slotCount,
      location: req.body.location,
      slotInfo: slotInfos,
    };

    ParkingLot.findOneAndUpdate({ userId: userId }, parkingPlace, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        return res
          .status(404)
          .send(
            new ResponseModel(
              false,
              "Parking lot not found for user id: " + parkingPlace.userId
            )
          );
      }
      return res.status(200).send(data);
    });
  } catch (err) {
    return res
      .status(500)
      .send(
        new ResponseModel(
          false,
          "Error occurred while retrieving parking lot info.",
          err
        )
      );
  }
};

exports.updateParkingSlotStatus = async (req, res) => {
  const userId = req.params.userid;
  const slot = req.body;

  try {
    const parking = await findOne(userId, false);

    let slotInfos = [];
    for (let i = 0; i < parking.slotCount; i++) {
      if (i + 1 == slot.id && slot.status == true) {
        slotInfos.push(
          new Slot(
            slot.id,
            slot.status,
            slot.vehicleNumber,
            slot.vehicleType,
            slot.contactNumber,
            slot.inTime,
            slot.pricePerHour
          )
        );
      } else if (i + 1 != slot.id && parking.slotInfo[i].status == true) {
        slotInfos.push(
          new Slot(
            i + 1,
            true,
            parking.slotInfo[i].vehicleNumber,
            parking.slotInfo[i].vehicleType,
            parking.slotInfo[i].contactNumber,
            parking.slotInfo[i].inTime,
            parking.slotInfo[i].pricePerHour
          )
        );
      } else {
        slotInfos.push(new Slot(i + 1, false, "", "", "", null, 0));
      }
    }

    ParkingLot.findOneAndUpdate(
      { userId: userId },
      { $set: { slotInfo: slotInfos } },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send(
              new ResponseModel(
                false,
                "Parking lot not found for user id: " + userId
              )
            );
        } else res.send(true);
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        });
      });
  } catch (err) {
    return res
      .status(500)
      .send(
        new ResponseModel(
          false,
          "Error occurred while retrieving parking lot info.",
          err
        )
      );
  }
};
