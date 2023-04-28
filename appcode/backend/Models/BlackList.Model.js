const mongoose = require("mongoose");

const BlackList = mongoose.model(
  "BlackList",
  new mongoose.Schema({
    token: String,
  })
);

module.exports = BlackList;