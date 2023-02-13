/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration
const authController = require("../controllers/auth.controller")

module.exports = (app)=>{
    
    //  POST 127.0.0.1:3000/submit
    app.post("/submit", authController.signup);

    // POST 127.0.0.1:3000/login
    app.post("/login", authController.signin);

    // POST 127.0.0.1:3000/logout
    app.post("/logout",authController.logout);
        
}