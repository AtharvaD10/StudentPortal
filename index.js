const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const dbConfig = require("./config/db.config");
const User = require('./models/user.model')

const cookieParser = require("cookie-parser");

//Port on which server is running
const port =  3000;

//Initalizing the server
const app = express();

app.use(cookieParser());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes")(app);
app.use(express.static('public'));

/**
 * Setup the mongodb connection 
 */
mongoose.set('strictQuery', true);
mongoose.connect(dbConfig.DB_URL, async () => {
 
  // await User.collection.drop();
  let user = User.find({userType : 'admin'});

  if(!user){
    //Creating a admin user 
    const user = await User.create({
      name: "Abhinav Chandurkar",
      userName: "admin",
      password: bcrypt.hashSync('abc',8),
      email: "abhinavchandurkar55@gmail.com",
      gender : "male",
      phoneNumber : 7757945671,
      userType: 'admin'
    });
    //log msg to check the connectivity 
    console.log("Admin Created");
  }
  console.log("MongoDB connected");
}); 

//listening on port 3000
app.listen(port, ()=>{
  console.log("Running on port 3000.");
});