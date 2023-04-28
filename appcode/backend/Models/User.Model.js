const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: { type: Number, unique: true },
    name: String,
    email: String,
    password: String,
    contactNumber: String,
    isActive: Boolean,
    isDeleted: Boolean,
    parentId: Number,
    securityCode: Number,
    userRole: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    parkingLot: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ParkingLot",
      },
    ],
  }).plugin(AutoIncrement, { inc_field: "userId" })
);

module.exports = User;
