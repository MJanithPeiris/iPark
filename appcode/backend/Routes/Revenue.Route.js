const { authJwt } = require("../Middlewares")
const controller = require("../Controllers/Revenue.Controller")
const { isAuthorized } = require("../Middlewares/Auth.Jwt")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "authorization",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/revenue/:userid",[authJwt.verifyToken, isAuthorized(["Company", "Parking"])], controller.getRevenueInfo)
    app.post("/api/revenue",[authJwt.verifyToken, isAuthorized(["Parking"])], controller.addRevenue)
}