const User = require("../models/user.model");
const bcrypt = require("bcryptjs");



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

        // Checking if the userName already exist 
        const checkUser = await User.findOne({userName : req.body.userName})
        if(checkUser != null){
          return res.json("userName already exist");
        }

      
        //creating obj to store user information
        const userObj = {
          name : req.body.name,
          userName : req.body.userName,
          email : req.body.email,
          phoneNumber : req.body.phoneNumber,
          password :  bcrypt.hashSync(req.body.password, 8),
          gender : req.body.gender
        }
      
        //Creating a user 
        const user = await User.create(userObj);
        
        //after logging as student the user will be redirected to the dashboard
        res.redirect('/home.html');
      }catch(error){
        console.error("Error while creating new user", error.message);
        res.status(500).send({
            message : "some internal error while inserting new user"
        })
      };

}


/**
 * Controller for signin
 */
exports.signin = async (req, res) =>{

  var user =  await User.findOne({email : req.body.email});
  //checking if the user exist
  if(user == null){
      return res.status(400).send({
          message : "Failed ! User id doesn't exist"
      })
  }

  //User is existing, so now we will do the password matching
  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      message: "Invalid Password!"
    });
  }
  
  // const token = jwt.sign({user}, config.secret, {
  //   expiresIn: 60 // 5 minutes
  // });
  // res.cookie("token",token,{
  //   httpOnly : true
  // });
  res.cookie("userName",user.userName,{
    httpOnly : true,
    maxAge : 600000000
  });

//Sending user to dashboard
res.redirect('/Dashboard');
  
};


exports.logout = (req, res) =>{
    //Sending user to dashboard
    res.redirect('/Home');
      
};

