const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const dbConfig = require("./config/db.config");
const path = require('path')
const User = require('./models/user.model')

//Port on which server is running
const port =  3000;

//Initalizing the server
const app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes")(app);

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