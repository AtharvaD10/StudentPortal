const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const dbConfig = require("./config/db.config");
const path = require('path')
const User = require('./models/user.model')

//Port on which server is running
const port = process.env.port || 3000;

//Initalizing the server
const app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

//home page http://localhost:3000/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Public', 'home.html'));
});

//Admin Page http://localhost:3000/Admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public', 'admin.html'));
});

//Dashboard http://localhost:3000/Dashboard.html
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public', 'Dashboard.html'));
});

//Registration page http://localhost:3000/registration.html
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public', 'registration.html'));
});

//Events Page http://localhost:3000/events.html
app.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public', 'events.html'));
});

/**
 *  Storing the registration data into the database
 */
app.post('/submit',async (req,res)=>{
  //checking if the password is matching 
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
  
});

app.post('/login',async (req,res)=>{
    //Search the user if it exists 
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
    
});

 /**
 * Setup the mongodb connection 
 */
mongoose.set('strictQuery', true);
mongoose.connect(dbConfig.DB_URL, async () => {
  console.log("MongoDB connected");
}) 

//listening on port 3000
app.listen(port, ()=>{
  console.log("Running on port 3000.");
});