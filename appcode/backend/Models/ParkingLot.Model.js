const mongoose = require("mongoose");

const ParkingLot = mongoose.model(
  "ParkingLot",
  new mongoose.Schema({
    userId: Number,
    slotCount: Number,
    location: String,
    slotInfo: [
      {
        id: Number,
        status: Boolean,
        vehicleNumber: String,
        vehicleType: String,
        contactNumber: String,
        inTime: Date,
        pricePerHour: Number,
      },
    ],
  })
);

module.exports = ParkingLot;