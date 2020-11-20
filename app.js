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

app.use(express.urlencoded({extended:false}))
//basic route

app.get("/",(req,res)=>{
res.render("index")

})

app.post("/",(req,res)=>{
    let data = req.body;
res.render("availabletickets",{data})

})
app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/signin",(req,res)=>{
    res.render("signin")
})