/**
 * This file will act as the route for all the html pages
 * 
 */

// define the routes - REST endpoints for user ui
const path = require('path')
const {authJwt} = require('../middleware');
const imageUploder = require("../middleware");
module.exports = (app)=>{
    
    //home page http://localhost:3000/
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../Public', 'home.html'));
    });
  
    //Admin Page http://localhost:3000/Admin.html
    app.get('/admin', [authJwt.verifyToken], (req, res) => {
      res.sendFile(path.join(__dirname, '../Public', 'admin.html'));
    });
  
    //Dashboard http://localhost:3000/Dashboard.html
    app.get('/dashboard', [authJwt.verifyToken],(req, res) => {
      res.sendFile(path.join(__dirname, '../Public', 'Dashboard.html'));
    });
  
    //Registration page http://localhost:3000/registration.html
    app.get('/registration', (req, res) => {
      res.sendFile(path.join(__dirname, '../Public', 'registration.html'));
    });
  
    //Events Page http://localhost:3000/events.html
    app.get('/events',[authJwt.verifyToken], (req, res) => {
      res.sendFile(path.join(__dirname, '../Public', 'events.html'));
    });
}