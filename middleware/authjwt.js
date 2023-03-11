/**
 *  In this file we are creating a cookie and storing the token in data which can verify a user 
 * 
 */

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
/**
 *  We are sacing the usersName when a user login in a cookie
 * ? we have to take that userName and check if the website accessing by the user is a vaild website 
 * * Do we need token?
 * 
 * 
 * 
 */



verifyToken = async (req, res, next) => {
    //taking the stored data from cookie 
    //const token = req.cookies.token;
    const userName = req.cookies.userName;
    console.log("Current User : "+userName);

    try{
        if(!userName){
            return res.status(403).send({
                message : "No token provided"
            })
        }
        // //If the token was provided, we need to verify it
        // jwt.verify(token,config.secret, (err, decoded)=>{
        //     if(err){
        //         console.log(err.message);
        //         return res.status(401).send({
        //             message: "Unauthorized"
        //         });
        //     }
    
            //I will try to read the userId from the decoded token and store it in req object
            // req.userName = decoded.id;
            next();
    }catch(err){
        // res.clearCookie("token");
        res.clearCookie("userName");
        return res.redirect("/");
    }
};


// validation = (req,res,next) =>{
    
// };


const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;