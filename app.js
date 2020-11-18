//set up express
const express = require("express");
const app = express();
const path = require("path")


//listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT);

//middleware
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));
//basic route

app.get("/",(req,res)=>{
res.render("index")

})