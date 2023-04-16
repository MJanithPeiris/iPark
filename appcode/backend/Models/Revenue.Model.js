const mongoose = require("mongoose");

const Revenue = mongoose.model(
  "Revenue",
  new mongoose.Schema({
    userId: Number,
    date: Date,
    amount: Number,
  })
);

module.exports = Revenue;