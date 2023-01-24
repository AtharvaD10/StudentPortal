const express = require("express");
const app = express();
const path = require('path')

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Public', 'home.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public', 'admin.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public', 'Dashboard.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public', 'registration.html'));
});

app.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public', 'events.html'));
});

  


app.listen(3000, ()=>{
  console.log("Running on port 3000.");
});