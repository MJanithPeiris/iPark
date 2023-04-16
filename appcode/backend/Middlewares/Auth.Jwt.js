const jwt = require("jsonwebtoken")
const config = require("../Config/Auth.Config")
const User = require('../Models/User.Model')
const Role = require('../Models/Role.Model')

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send({ message: "No token provided!" })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" })
        }
        req.userId = decoded.id
        next()
    })
}

isSuperAdmin = (req, res, next) => {
    console.log(req.userId);
    User.findOne({id: req.userId}).exec((err, user) => {
        console.log('super admin');
        if (err) {
            console.log('super admin');
            res.status(500).send({ message:'Internal error' +  err })
            return
        }

        Role.find({
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: 'Internal error' + err });
                    return
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "SuperAdmin") {
                        next()
                        return
                    }
                }

                res.status(403).send({ message: "Require Super Admin Role!" })
                return
            }
        )
    })
}

isCompany = (req, res, next) => {
    User.findOne({id: req.userId}).exec((err, user) => {
        console.log('company');
        if (err) {
            res.status(500).send({ message:'Internal error' +  err })
            return
        }

        Role.find({
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: 'Internal error' + err })
                    return
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "Company") {
                        next()
                        return
                    }
                }

                res.status(403).send({ message: "Require Company Role!" })
                return
            }
        )
    })
}

isParking = (req, res, next) => {
    User.findOne({id: req.userId}).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: 'Internal error' + err })
            return
        }

        Role.find({
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: 'Internal error' + err })
                    return
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "Parking") {
                        next()
                        return
                    }
                }

                res.status(403).send({ message: "Require Parking Role!" })
                return
            }
        )
    })
}

const authJwt = {
    verifyToken,
    isSuperAdmin,
    isCompany,
    isParking
}

module.exports = authJwt