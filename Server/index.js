const express = require('express');
const app =express();
const PORT = 8080;
const path = require('path');


app.use(express.static('public'));
app.use()



//home 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'../client','home.html'));
});


app.listen(PORT,()=>{
    console.log("Server stareted at "+PORT);
})