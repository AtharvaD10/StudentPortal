const User = require("../models/user.model");


/**
 * Controller for signup/registration
 */
exports.signup = async (req, res) => {
    
    try{
        if(req.body.password != req.body.confirmPassword){
          return res.status(400).send({
            message : "Invalid Password"
          });
        };
      
        //creating obj to store user information
        const userObj = {
          name : req.body.name,
          userName : req.body.userName,
          email : req.body.email,
          phoneNumber : req.body.phoneNumber,
          password :  req.body.password,
          gender : req.body.gender
        }
      
        //Creating a user 
        const user = await User.create(userObj);
    
        //after logging as student the user will be redirected to the dashboard
        res.redirect('/dashboard');
      }catch(error){
        console.error("Error while creating new user", err.message);
        res.status(500).send({
            message : "some internal error while inserting new user"
        })
      };

}


/**
 * Controller for signin
 */
exports.signin = async (req, res) =>{
  
    try{
        var user =  await User.findOne({email : req.body.email});
        }catch(err){
        }
        console.log(user);
        if(user == null){
            return res.status(400).send({
                message : "Failed ! User id doesn't exist"
            })
        }
    
        //User is existing, so now we will do the password matching
        if(user.password != req.body.password){
          /**
           * Add a popup window to show alert
           */
            return res.status(401).send({
                message : "Invalid Password"
            })
        }
       
      //Sending user to dashboard
      res.redirect('/Dashboard');
        
};


exports.logout = (req, res) =>{
    //Sending user to dashboard
    res.redirect('/Home');
      
};