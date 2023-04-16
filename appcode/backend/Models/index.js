const mongoose = require("mongoose");
const dbConfig = require("../Config/db.config");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./User.Model")(mongoose);
db.role = require("./Role.Model")(mongoose);
db.parkingLot = require("./ParkingLot.Model")(mongoose);
db.revenue = require("./Revenue.Model")(mongoose);
db.blackList = require("./BlackList.Model")(mongoose);

db.ROLES = ["SuperAdmin", "Company", "Parking"];

module.exports = db;