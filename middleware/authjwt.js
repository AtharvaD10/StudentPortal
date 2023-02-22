/**
 *  In this file we are creating a cookie and storing the token in data which can verify a user 
 * 
 */

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");




verifyToken = async (req, res, next) => {
    console.log("Middleware called");
    const token = req.cookies.token;
    try{
        const user = jwt.verify(token,config.secret);
        req.user = user;
        next();
    }catch(err){
        res.clearCookie("token");
        return res.redirect("/");
    }
};


const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;