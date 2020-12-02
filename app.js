//set up express
const express = require("express");
const app = express();
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const connection = require("./connection/connection") //connection
let forcedrouting = false;

//listen to port
const PORT = process.env.PORT || 3000;

//authenticate connection to database
connection.authenticate()
    .then(() => {
        console.log("connected");
        app.listen(PORT);
    })
    .catch(() => {
        console.log("error occured");
    })
//require all models here
const User = require("./models/user")

//sync the connection
connection.sync({ force: true });

//All Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'SECRET KEY',
    resave: false,
    saveUninitialized: true
}))
app.use(flash());
//basic route

//all get routes
app.get("/", (req, res) => {

    if (req.session.loggedin === true) {
     res.redirect("/home")
    }
    else {
        res.render("index",{navbar : ''})
    }
})

app.get("/signup", (req, res) => {
    res.render("signup", { errormessages: '' })
})
app.get("/signin", (req, res) => {
    if(forcedrouting == false){
        res.render("signin", { errormessages: '', successmessages: '' })
    }
    else{
        forcedrouting = false;
        req.flash('message', '*PLEASE LOGIN TO CONTINUE BOOKING*')
        res.render("signin", { errormessages: req.flash('message'),successmessages: '' })
    }
})
app.get("/aboutus", (req, res) => {
    res.render("aboutus")
})
app.get("/home",(req,res)=>{
    if (req.session.loggedin === true) {
        res.render("index",{navbar : 'loginsuccesful'})
    }
    else {
        forcedrouting = true;
        res.redirect("/signin")
    }

})
app.get("/mybookings",(req,res)=>{
    if (req.session.loggedin === true) {
        res.send("mybookings : page to be created!")
    }
    else {
        forcedrouting = true;
        res.redirect("/signin");
    }
})
app.get("/myprofile",(req,res)=>{
    if (req.session.loggedin === true) {
      res.render("myprofile")
    }
    else {
        forcedrouting = true;
        res.redirect("/signin");
    }
})

app.get("/logout",(req,res)=>{
    if (req.session.loggedin === true) {
        req.session.loggedin = false;
        res.redirect("/")
      }
      else {
        forcedrouting = true;
        res.redirect("/signin");
      }
})


//all post routes
app.post("/", (req, res) => {
    let data = req.body;
    // res.send(data);
    console.log(req.session.loggedin);
    if (req.session.loggedin === true) {
        res.send(data)
    }
    else {
        req.flash('message', '*PLEASE LOGIN TO CONTINUE BOOKING*')
        res.render("signin", { errormessages: req.flash('message'),successmessages: '' })
    }
})
app.post("/signin", (req, res) => {
    let data = req.body;
    let email = req.body.email;
    let inputpassword = req.body.password;

    User.findOne({ where: { emailId: email } })
        .then((user) => {
            if (!user) {
                req.flash('message', '*NO EMAIL REGISTERED FOUND!*')
                res.render("signin", { errormessages: req.flash('message'),successmessages: '' })
            }
            else {
                let registereduser = user.dataValues;
                let userid = registereduser.userid;
                let password = registereduser.password;
                let email = registereduser.emailId;

                if (inputpassword !== password) {
                    req.flash('message', '*INCORRECT PASSWORD*')
                    res.render("signin", { errormessages: req.flash('message'),successmessages: '' })
                }
                else{
                    req.session.loggedin = true
                    res.redirect("/home")

                }
            }
        })
})
app.post("/signup", (req, res) => {
    let data = req.body;
    let email = req.body.email;
    let passwordfield = req.body.password;
    let confirmpasswordfield = req.body.confirmpassword;

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(req.body.email) == false) {
        req.flash('message', '*PLEASE ENTER VALID EMAIL ADDRESS*')
        res.render("signup", { errormessages: req.flash('message') })
    }
    else if (passwordfield.length < 8) {
        req.flash('message', '*PASSWORD SHOULD BE GREATER THAN 8 CHARACTERS*')
        res.render("signup", { errormessages: req.flash('message') })
    }
    else if (passwordfield !== confirmpasswordfield) {
        req.flash('message', 'CONFIRM PASSWORD AND PASSWORD FIELD DO NOT MATCH')
        res.render("signup", { errormessages: req.flash('message') })
    }
    User.findOne({ where: { emailId: email } })
        .then((user) => {
            if (!user) {
                console.log("no user like that found");
                User.create({
                    emailId: `${email}`,
                    password: `${passwordfield}`
                })
                    .then(() => {
                        console.log("new user created");
                    })

                req.flash('message', 'REGISTERED SUCCESFULLY. LOGIN NOW')
                res.render("signin", { errormessages: '', successmessages: req.flash('message') })
            }
            else {

                req.flash('message', 'EMAIL ID IS ALREADY REGISTERED')
                res.render("signup", { errormessages: req.flash('message') })
            }
        })
})


//404 error handling
app.get("*",(req,res)=>{
    res.status(404);
res.send("404 Page not found")
//page to be designed at last
})

