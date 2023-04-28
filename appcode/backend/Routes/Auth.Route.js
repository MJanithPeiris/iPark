const { authJwt } = require("../Middlewares")
const controller = require("../Controllers/Auth.Controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", "authorization",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signout",[authJwt.verifyToken], controller.signout);
  app.post("/api/auth/forgetpassword", controller.forgetPassword);
  app.post("/api/auth/validatesecuritycode", controller.isValidateSecurityCode);
  app.post("/api/auth/resetpassword", controller.resetPassword);
};