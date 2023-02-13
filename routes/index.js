const authRoutes = require("./auth.route");
const pageRoutes = require("./page.route");


module.exports = (app)=>{
    authRoutes(app);
    pageRoutes(app);
}