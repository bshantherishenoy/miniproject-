//set up express
const express = require("express");
const app = express();
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const connection = require("./connection/connection") //connection

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
    res.render("index")

})

app.get("/signup", (req, res) => {
    res.render("signup", { errormessages: '' })
})
app.get("/signin", (req, res) => {
    res.render("signin", { errormessages: '' ,successmessages: ''})
})
app.get("/aboutus", (req, res) => {
    res.render("aboutus")
})

//all post routes
app.post("/", (req, res) => {
    let data = req.body;
    // res.send(data);
    if (req.session.loggedin === true) {
        res.send(data)
    }
    else {
        req.flash('message', '*PLEASE LOGIN TO CONTINUE BOOKING*')
        res.render("signin", { errormessages: req.flash('message') })
    }
})
app.post("/signin", (req, res) => {
    let data = req.body;
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
    else {
        //everything is valid
        User.create({
            emailId: `${email}`,
            password: `${passwordfield}`
        })
            .then(() => {
                console.log("new user created");
            })
        req.flash('message', 'REGISTERED SUCCESFULLY. LOGIN NOW')
        res.render("signin", { errormessages: '',successmessages: req.flash('message') })
    }



})



