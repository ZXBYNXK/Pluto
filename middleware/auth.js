const {verify} = require("jsonwebtoken");
const {jwtSec} = require("../config");
module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");
    // Check if not token
    if(!token)
    {
       return res.status(401).json({msg: "No token, authorization denied."})
    }

    // Verify token
    try {
        const decoded = verify(token, jwtSec);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid."})
    }
}