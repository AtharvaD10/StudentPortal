const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");




verifyToken = async (req, res, next) => {
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