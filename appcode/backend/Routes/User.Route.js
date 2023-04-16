const { authJwt, verifySignUp } = require("../Middlewares/index");
const controller = require("../Controllers/User.Controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
      authJwt.verifyToken,
      authJwt.isAuthorized(["SuperAdmin", "Company"]),
    ],
    controller.addUser
  );
  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAuthorized(["SuperAdmin", "Company"])],
    controller.getUsers
  );
  app.get(
    "/api/user/:userid",
    [
      authJwt.verifyToken,
      authJwt.isAuthorized(["SuperAdmin", "Company", "Parking"]),
    ],
    controller.getUserByUserId
  );
  app.get(
    "/api/user/subusers/:parentid",
    [authJwt.verifyToken, authJwt.isAuthorized(["SuperAdmin", "Company"])],
    controller.getUsersByParentId
  );
  app.put(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAuthorized(["SuperAdmin", "Company"])],
    controller.updateUser
  );
  app.delete(
    "/api/user/:userid",
    [authJwt.verifyToken, authJwt.isAuthorized(["SuperAdmin", "Company"])],
    controller.deleteUser
  );
  app.patch(
    "/api/user/:userid/activate",
    [authJwt.verifyToken, authJwt.isAuthorized(["SuperAdmin", "Company"])],
    controller.activateUser
  );
  app.patch(
    "/api/user/:userid/deactivate",
    [authJwt.verifyToken, authJwt.isAuthorized(["SuperAdmin", "Company"])],
    controller.deactivateUser
  );
};
