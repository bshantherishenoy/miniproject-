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
        app.listen(PORT, () => {
            console.log(`--------SERVER RUNNING ON PORT ${PORT}--------`);
        });
    })
    .catch(() => {
        console.log("error occured");
    })
    //require all models here
const User = require("./models/user")
const Usertravel = require("./models/usertravel")
const flightbooking = require("./models/flightbooking");
const trainbooking = require("./models/trainbooking");
const busbooking = require("./models/busbooking")

User.hasMany(flightbooking, { foreignKey: 'userid' }); // creating foreign key
flightbooking.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(trainbooking, { foreignKey: 'userid' }); // creating foreign key
trainbooking.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(busbooking, { foreignKey: 'userid' }); // creating foreign key
busbooking.belongsTo(User, { foreignKey: 'userid' });


User.hasMany(Usertravel, { foreignKey: 'userid' }); // setting foreign key for usertrvel 
Usertravel.belongsTo(User, { foreignKey: 'userid' })


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
app.use(express.json());
//basic route

//all get routes

//home page when not signed in
app.get("/", (req, res) => {

    if (req.session.loggedin === true) {


        return res.redirect("/home")
    } else {
        res.render("index", { navbar: '', errormessages: '' })
    }
})

//signup page
app.get("/signup", (req, res) => {
    if (req.session.loggedin === true) {
        return res.redirect("/home");
    }
    res.render("signup", { errormessages: '' })
})
app.get("/signin", (req, res) => {
    if (forcedrouting == true) {
        forcedrouting = false;
        req.flash('message', '*PLEASE LOGIN TO CONTINUE BOOKING*')
        return res.render("signin", { errormessages: req.flash('message'), successmessages: '' })
    }
    if (req.session.loggedin == true) {
        return res.redirect("/home");
    }
    return res.render("signin", { errormessages: '', successmessages: '' })


})

//About Us page
app.get("/aboutus", (req, res) => {
    res.render("aboutus")
})

//Home page when it is signed in
app.get("/home", (req, res) => {

    if (req.session.loggedin === true) {
        console.log(req.session.userid);
        return res.render("index", { navbar: 'loginsuccesful', errormessages: '' })
    } else {
        forcedrouting = true;
        res.redirect("/signin")
    }

})

//Page to show all user bookings
app.get("/mybookings", (req, res) => {
    if (req.session.loggedin === true) {
        return res.send("mybookings : page to be created!")
    } else {
        forcedrouting = true;
        res.redirect("/signin");
    }
})

//Page to show user profile
app.get("/myprofile", (req, res) => {
    if (req.session.loggedin === true) {
        return res.render("myprofile")
    } else {
        forcedrouting = true;
        res.redirect("/signin");
    }
})

//Page to logout
app.get("/logout", (req, res) => {
    if (req.session.loggedin === true) {
        req.session.loggedin = false;
        return res.redirect("/")
    } else {
        forcedrouting = true;
        res.redirect("/signin");
    }
})

//Page gets all train details
app.get("/train", (req, res) => {
    if (req.session.loggedin != true) {

forcedrouting  = true;
        return res.redirect("/signin")
    }

    return  res.render("train")

    })
    //page gets all bus details 
app.get("/bus", (req, res) => {
    if (req.session.loggedin != true) {

        forcedrouting  = true;
                return res.redirect("/signin")
            }
       return res.render("bus")

    })
    //Page gets all flight details
app.get("/flight", (req, res) => {
    if (req.session.loggedin != true) {

        forcedrouting  = true;
                return res.redirect("/signin")
            }
    return res.render("flight");

})

// API sends data about flight details
app.get("/flightdetails", (req, res) => {
        console.log("---------TRIGGERED-----------");
        Usertravel.findOne({
                where: {
                    userid: req.session.userid,
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then((user) => {
                console.log(user);
                let data = user.dataValues;
                res.send(data);
            })
    })
    // API sends data about Bus details
app.get("/busdetails", (req, res) => {
    console.log("---------TRIGGERED-----------");
    Usertravel.findOne({
            where: {
                userid: req.session.userid,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then((user) => {
            console.log(user);
            let data = user.dataValues;
            res.send(data);
        })
})

// API sends data about Train details
app.get("/traindetails", (req, res) => {
        console.log("---------TRIGGERED-----------");
        Usertravel.findOne({
                where: {
                    userid: req.session.userid,
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then((user) => {
                console.log(user);
                let data = user.dataValues;
                res.send(data);
            })
    })
//return flight booking API
    app.get("/flightreturnbooking",(req,res)=>{
        console.log("heloooooooooooooooooooo");
        Usertravel.findOne({
            where: {
                userid: req.session.userid,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then((user) => {
            console.log(user);
            let data = user.dataValues;
            Usertravel.create({
                userid: `${req.session.userid}`,
                from: `${data.to}`,
                to: `${data.from}`,
                mode: `${data.mode}`,
                adult: `${data.adult}`,
                children: `${data.children}`,
                departuredate: `${data.departuredate}`,
                returndate: `returnbook`
            })
            res.send(data);
        })
    
    })

    //return train booking API
    app.get("/trainreturnbooking",(req,res)=>{
        console.log("heloooooooooooooooooooo");
        Usertravel.findOne({
            where: {
                userid: req.session.userid,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then((user) => {
            console.log(user);
            let data = user.dataValues;
            Usertravel.create({
                userid: `${req.session.userid}`,
                from: `${data.to}`,
                to: `${data.from}`,
                mode: `${data.mode}`,
                adult: `${data.adult}`,
                children: `${data.children}`,
                departuredate: `${data.departuredate}`,
                returndate: `returnbook`
            })
            res.send(data);
        })
    
    })
     //return bus booking API
     app.get("/busreturnbooking",(req,res)=>{
        console.log("heloooooooooooooooooooo");
        Usertravel.findOne({
            where: {
                userid: req.session.userid,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then((user) => {
            console.log(user);
            let data = user.dataValues;
            Usertravel.create({
                userid: `${req.session.userid}`,
                from: `${data.to}`,
                to: `${data.from}`,
                mode: `${data.mode}`,
                adult: `${data.adult}`,
                children: `${data.children}`,
                departuredate: `${data.departuredate}`,
                returndate: `returnbook`
            })
            res.send(data);
        })
    
    })
    //all post routes
   //
   //
   //
app.post("/flightbooking", (req, res) => {
    console.log("---------BADABOOMBOOMBOOM-----------");

    console.log(req.body);
    let { price, fromtime, totime, brand, flightid } = req.body;

    flightbooking.create({
            userid: `${req.session.userid}`,
            flightid: `${flightid}`,
            flightname: `${brand}`,
            fromtime: `${fromtime}`,
            totime: `${totime}`,
            price: `${price}`,
            paymentstatus: `${0}`
        })
        .then(() => {
            console.log("DATA UPDATED");
            res.send("recieved")
        })
})

app.post("/trainbooking", (req, res) => {
    console.log("---------BADABOOMBOOMBOOM-----------");

    console.log(req.body);
    let { price, fromtime, totime, brand, class1 } = req.body;

    trainbooking.create({
            userid: `${req.session.userid}`,
            trainname: `${brand}`,
            class: `${class1}`,
            fromtime: `${fromtime}`,
            totime: `${totime}`,
            price: `${price}`,
            paymentstatus: `${0}`
        })
        .then(() => {
            console.log("DATA UPDATED");
            res.send("recieved")
        })
})


app.post("/busbooking", (req, res) => {
    console.log("---------BADABOOMBOOMBOOM-----------");

    console.log(req.body);
    let { price, fromtime, totime, brand, class1 } = req.body;

    busbooking.create({
            userid: `${req.session.userid}`,
            busname: `${brand}`,
            class: `${class1}`,
            fromtime: `${fromtime}`,
            totime: `${totime}`,
            price: `${price}`,
            paymentstatus: `${0}`
        })
        .then(() => {
            console.log("DATA UPDATED");
            res.send("recieved")
        })
})




app.post("/home", (req, res) => {
    let data = req.body;
    // res.send(data);
    console.log(data);
    console.log(req.session.loggedin);
    if (req.session.loggedin === true) {
        let inputdate = new Date(data.date1).setHours(0, 0, 0, 0);
        let todaydate = new Date().setHours(0, 0, 0, 0);
        //Data input validation //handle this only update in db if valid //currently everything is crashing
        if (data.from == data.to) {
            req.flash('message', 'SORCE AND DESTINATION CANNOT BE SAME')
            return res.render("index", { navbar: 'loginsuccesful', errormessages: req.flash('message') })
        }
        if (inputdate < todaydate) {
            req.flash('message', 'PLEASE ENTER VALID DATE')
            return res.render("index", { navbar: 'loginsuccesful', errormessages: req.flash('message') })
        } else if (data.date2 != undefined) {
            let returndate = new Date(data.date2).setHours(0, 0, 0, 0)
            console.log({ returndate });
            console.log({ inputdate });
            if (returndate < inputdate) {
                console.log("triggered");
                req.flash('message', 'RETURN DATE CANNOT BE LESS THAN DEPARTURE DATE')
                return res.render("index", { navbar: 'loginsuccesful', errormessages: req.flash('message') })
            }
        }
        //update in database
        Usertravel.create({
                userid: `${req.session.userid}`,
                from: `${data.from}`,
                to: `${data.to}`,
                mode: `${data.transport}`,
                adult: `${data.adult}`,
                children: `${data.children}`,
                departuredate: `${data.date1}`,
                returndate: `${data.date2}`
            })
            .then(() => {
                console.log("new user data published");
                console.log(data);
                if (data.transport == 'PLANE') {
                    return res.redirect("/flight")

                }
                if (data.transport == 'BUS') {
                    return res.redirect("/bus")

                }
                if (data.transport == 'TRAIN') {
                    return res.redirect("/train")

                }
            })


    }

    //not logged In
    else {
        req.flash('message', '*PLEASE LOGIN TO CONTINUE BOOKING*')
        res.render("signin", { errormessages: req.flash('message'), successmessages: '' })
    }
})
app.post("/signin", (req, res) => {
    let data = req.body;
    let email = req.body.email;
    let inputpassword = req.body.password;

    //get all user details by email
    User.findOne({ where: { emailId: email } })
        .then((user) => {
            if (!user) {
                req.flash('message', '*NO EMAIL REGISTERED FOUND!*')
                return res.render("signin", { errormessages: req.flash('message'), successmessages: '' })
            } else {
                console.log(user);
                let registereduser = user.dataValues;
                let userid = registereduser.userid;
                let password = registereduser.password;
                let email = registereduser.emailId;

                if (inputpassword !== password) {
                    req.flash('message', '*INCORRECT PASSWORD*')
                    return res.render("signin", { errormessages: req.flash('message'), successmessages: '' })
                } else {
                    req.session.loggedin = true
                    req.session.userid = registereduser.userid;
                    console.log(req.session.userid);
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
        return res.render("signup", { errormessages: req.flash('message') })
    } else if (passwordfield.length < 8) {
        req.flash('message', '*PASSWORD SHOULD BE GREATER THAN 8 CHARACTERS*')
        return res.render("signup", { errormessages: req.flash('message') })
    } else if (passwordfield !== confirmpasswordfield) {
        req.flash('message', 'CONFIRM PASSWORD AND PASSWORD FIELD DO NOT MATCH')
        return res.render("signup", { errormessages: req.flash('message') })
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
                return res.render("signin", { errormessages: '', successmessages: req.flash('message') })
            } else {

                req.flash('message', 'EMAIL ID IS ALREADY REGISTERED')
                res.render("signup", { errormessages: req.flash('message') })
            }
        })
})


//404 error handling
app.get("*", (req, res) => {
    res.status(404);
    res.send("404 Page not found")
        //page to be designed at last
})