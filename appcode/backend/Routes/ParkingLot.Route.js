const { authJwt } = require("../Middlewares");
const controller = require("../Controllers/ParkingLot.Controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/parkinglot/:userid",
    [authJwt.verifyToken, isAuthorized(["SuperAdmin", "Company", "Parking"])],
    controller.getParkingInfo
  );
  app.put(
    "/api/parkinglot",
    [authJwt.verifyToken, isAuthorized(["SuperAdmin", "Company"])],
    controller.updateParkingSlot
  );
  app.patch(
    "/api/parkinglot/:userid/slotstatus",
    [authJwt.verifyToken, isAuthorized(["Parking"])],
    controller.updateParkingSlotStatus
  );
};
