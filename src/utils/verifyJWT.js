const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secretToken = process.env.TOKEN

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.header.Authorization;

    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretToken, (err, decoded) => {
        if(err) return res.sendStatus(403)

        req.user = decoded.user
        next()
    })
}

module.exports = verifyJWT;