const express = require("express");
const app = express();
const path = require('path')

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

  

//listening on port 3000
app.listen(3000, ()=>{
  console.log("Running on port 3000.");
});