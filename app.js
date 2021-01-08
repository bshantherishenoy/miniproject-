//set up express
const express = require("express");
const app = express();
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const connection = require("./connection/connection") //connection
let forcedrouting = false;
const md5 = require('md5');
const { Op } = require("sequelize");
const short = require('short-uuid');
const nodemailer = require("nodemailer");
// const { QueryTypes } = require('sequelize');
// let used = 0;


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
const hotelbooking = require("./models/hotelbooking");

User.hasMany(flightbooking, { foreignKey: 'userid' }); // creating foreign key
flightbooking.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(trainbooking, { foreignKey: 'userid' }); // creating foreign key
trainbooking.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(busbooking, { foreignKey: 'userid' }); // creating foreign key
busbooking.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(hotelbooking, { foreignKey: 'userid' }); // creating foreign key
hotelbooking.belongsTo(User, { foreignKey: 'userid' });

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


//nodemailer setup
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'easygowebservice@gmail.com',
        pass: 'easygo1234'
    }
})


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
        return res.render("mybookings");
    } else {
        forcedrouting = true;
        res.redirect("/signin");
    }
})

//Page to show user profile
app.get("/myprofile", (req, res) => {
    if (req.session.loggedin === true) {
        User.findOne({
            where: {
                userid: req.session.userid
            }
        })
            .then((user) => {
                const mails = user.emailId;
                res.render("myprofile", { useremail: mails });
            })

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

        forcedrouting = true;
        return res.redirect("/signin")
    }

    return res.render("train")

})
//page gets all bus details
app.get("/bus", (req, res) => {
    if (req.session.loggedin != true) {

        forcedrouting = true;
        return res.redirect("/signin")
    }
    return res.render("bus")

})
//Page gets all flight details
app.get("/flight", (req, res) => {
    if (req.session.loggedin != true) {

        forcedrouting = true;
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
app.get("/flightreturnbooking", (req, res) => {
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
                bookingid: `${data.bookingid}`,
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
app.get("/trainreturnbooking", (req, res) => {
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
                bookingid: `${data.bookingid}`,
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
app.get("/busreturnbooking", (req, res) => {
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
                bookingid: `${data.bookingid}`,
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

app.get("/summary", (req, res) => {
    // if (req.session.loggedin === true) {
    return res.render("summary");
    // } else {
    //     forcedrouting = true;
    //     res.redirect("/signin");
    // }
})
//hotel route
app.get("/hoteldetails", (req, res) => {
    Usertravel.findOne({
        where: {
            userid: req.session.userid,
            returndate: {
                [Op.not]: 'returnbook'
            }
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
app.get("/hotel", (req, res) => {
    res.render("hotel");
})

app.get("/summarydetails", (req, res) => {
    Usertravel.findOne({
        where: {
            userid: req.session.userid,
            returndate: {
                [Op.not]: 'returnbook'
            }
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

app.get("/mybookingstatus", (req, res) => {

    Usertravel.findAll({
        where: {
            userid: req.session.userid
        }
    })
        .then((alluserdata) => {
            Usertravel.findAll({
                where: {
                    userid: req.session.userid,
                    returndate: 'returnbook'
                }
            }).then((returnbookings) => {
                flightbooking.findAll({
                    where: {
                        userid: req.session.userid,
                        paymentstatus: 1
                    }
                })
                    .then((flightbookings) => {
                        trainbooking.findAll({
                            where: {
                                userid: req.session.userid,
                                paymentstatus: 1
                            }
                        })
                            .then((trainbookings) => {
                                busbooking.findAll({
                                    where: {
                                        userid: req.session.userid,
                                        paymentstatus: 1
                                    }
                                })
                                    .then((busbookings) => {
                                        hotelbooking.findAll({
                                            where: {
                                                userid: req.session.userid,
                                                paymentstatus: 1
                                            }
                                        })
                                            .then((hotelbookings) => {
                                                console.log("---------------------");
                                                console.log(flightbookings);
                                                console.log("---------------------");
                                                console.log(trainbookings);
                                                console.log("---------------------");
                                                console.log(busbookings);
                                                console.log("---------------------");
                                                console.log(hotelbookings);
                                                console.log("---------------------");
                                                res.send({
                                                    returnbookings,
                                                    flightbookings,
                                                    trainbookings,
                                                    busbookings,
                                                    hotelbookings,
                                                    alluserdata
                                                })
                                            })
                                    })
                            })

                    })


            })


        })

})
app.post("/cancelbooking", (req, res) => {
    let emailidofuser;
    User.findOne({
        where: {
            userid: req.session.userid
        }
    }).then((dataaboutuser) => {
        emailidofuser = dataaboutuser.dataValues.emailId
    })
    console.log(req.body.id);
    flightbooking.destroy({
        where: {
            bookingid: req.body.id
        }
    })
        .then(() => {
            console.log("deleted");
            //delete train bookings
            trainbooking.destroy({
                where: {
                    bookingid: req.body.id
                }
            })
                .then(() => {
                    console.log("deleted");
                    //delete  bus bookings
                    busbooking.destroy({
                        where: {
                            bookingid: req.body.id
                        }
                    })
                        .then(() => {
                            console.log("deleted");
                            let mailOptions = {
                                from: 'easygowebservice@gmail.com',
                                to: `${emailidofuser}`,
                                subject: 'YOUR BOOKING WAS CANCELLED',
                                html: `
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Document</title>
                                    <style>
                                    .footer-padding {
                                        padding-bottom: 60px;
                                    }

                                    .footer {
                                        position: absolute;
                                        text-align: center;
                                        bottom: 0;
                                        width: 100%;
                                        height: 60px;
                                        background-color: #1abc9c;
                                    }

                                    .footer p {
                                        margin-top: 25px;
                                        font-size: 12px;
                                      color: #fff;
                                      font-size: 20px;
                                    }
                                    </style>
                                    </head>
                                    <body>
                                        <h1>Your booking was Cancelled Successfully.</h1>

                                        <h2>Thanks for using Easygo.</h2>
                                        <h2>We hope to see you soon!!</h2>

                                        <h4>If you have not cancelled this booking, please reply to this mail withyour useremail and we will get back to you.Your amount will be refunded in 2 -3 working days.If not feel free to contact us.</h4>
                                    </body>
                                    <footer>
                                    <div class="footer-padding"></div>
                                    <div class="footer">
                                      <p>See you soon @ EasyGo 😁 </p>
                                    </div>
                                  </div>
                                    </footer>
                                    </html>
                                    `
                            }
                            transporter.sendMail(mailOptions, (err, data) => {
                                if (err) {
                                    console.log("error");
                                }
                                else {
                                    console.log("sent");
                                }

                            })
                            res.send("deleted")

                        })
                })
        })



})

//all post routes
//
//
//

app.post("/paymentprocessing", (req, res) => {
    let emailidofuser;
    console.log("abe here-----------------------------------");
    console.log(req.body.mode);
    console.log(req.body.uuid1);
    console.log(req.body.uuid2);
    console.log(req.body.hoteluuid);
    console.log("abe here-----------------------------------");
    console.log("ENTERING UPDATE PROCESS");
    User.findOne({
        where: {
            userid: req.session.userid
        }
    }).then((dataaboutuser) => {
        emailidofuser = dataaboutuser.dataValues.emailId
    })
    if (req.body.mode == "PLANE") {

        flightbooking.findOne({
            where: {
                bookingid: req.body.uuid1
            }
        }).then((data1) => {
            data1.update({ paymentstatus: 1 })
                .then(() => {
                    console.log("first one updated");
                    if (req.body.uuid2 != undefined) {
                        flightbooking.findOne({
                            where: {
                                bookingid: req.body.uuid2,
                            },
                            order: [
                                ['createdAt', 'DESC']
                            ]
                        }).then((data3) => {
                            data3.update({ paymentstatus: 1 })
                                .then(() => {
                                    console.log("second one updated");
                                    hotelbooking.findOne({
                                        where: {
                                            bookingid: req.body.hoteluuid
                                        }
                                    }).then((data4) => {
                                        data4.update({ paymentstatus: 1 })
                                            .then(() => {
                                                console.log("hotel updated");
                                                //send mail here for hotel booking with flight
                                                //data1 -- going data3 -- return data4 -- hotel
                                                Usertravel.findOne({
                                                    bookingid: req.body.uuid1
                                                }).then((userdata) => {
                                                    Usertravel.findOne(({
                                                        bookingid: req.body.uuid1
                                                    })).then((usertraveldata) => {

                                                        let mailOptions = {
                                                            from: 'easygowebservice@gmail.com',
                                                            to: `${emailidofuser}`,
                                                            subject: 'YOUR BOOKING WAS SUCCESSFUL',
                                                            html: `
                                                                <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Document</title>
                                <style>
                                .footer-padding {
                                    padding-bottom: 60px;
                                }

                                .footer {
                                    position: absolute;
                                    text-align: center;
                                    bottom: 0;
                                    width: 100%;
                                    height: 60px;
                                    background-color: #1abc9c;
                                }

                                .footer p {
                                    margin-top: 25px;
                                    font-size: 12px;
                                  color: #fff;
                                  font-size: 20px;
                                }
                                </style>
                            </head>
                            <body>
                                <h1>Thankyou! for Easygo, Your booking is confirmed</h1>

                                <h2>Here are the details :</h2>
                                <hr/>

                                <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                                    <tbody>
                                      <tr>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Booking id</td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.bookingid}</strong></td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">FlightID</td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.flightid}</strong></td>
                                      </tr>
                                      <tr>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Flight Name</td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.flightname}</strong></td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Price</td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.price}</strong></td>
                                    </tr>
                                      <tr>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From Time</td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.fromtime}</strong></td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To Time</td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.totime}</strong></td>
                                      </tr>
                                      <tr>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of Adult</td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of children</td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.children}</strong></td>
                                    </tr>
                                    <tr>
                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From</td>
                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.from}</strong></td>
                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To</td>
                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.to}</strong></td>
                                  </tr>
                                  <tr>
                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Name</td>
                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelname}</strong></td>
                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Class</td>
                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelclass}</strong></td>
                                </tr>
                                <tr>
                                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Address</td>
                                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hoteladdress}</strong></td>
                                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Destination</td>
                                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.destination}</strong></td>
                              </tr>
                              <tr>
                              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel price</td>
                              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelprice}</strong></td>
                              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Return Price</td>
                              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data3.dataValues.price}</strong></td>
                            </tr>



                                    </tbody>
                                </table>
                                  <hr/>
                                <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                                <tbody>
                                  <tr>
                                    <td valign="top"
                                      style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: left; padding-left: 1rem;">
                                      <strong>TOTAL PRICE</strong></td>
                                    <td valign="top"
                                      style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: end; padding-right: 5rem;">
                                      <strong style="font-size:28px">${Number(data3.dataValues.price) + Number(data4.dataValues.hotelprice) + Number(data1.dataValues.price)}₹</strong>
                                    </td>
                                  </tr>
                                  </tbody>
                              </table>
                              <hr>
                            </body>
                            <footer>
                            <div class="footer-padding"></div>
                            <div class="footer">
                              <p>Happy Journey 😁 </p>
                            </div>
                          </div>
                            </footer>
                            </html>

                                                                `
                                                        }
                                                        transporter.sendMail(mailOptions, (err, data) => {
                                                            if (err) {
                                                                console.log("error");
                                                            }
                                                            else {
                                                                console.log("sent");
                                                            }

                                                        })


                                                    })

                                                })
                                            })
                                    })

                                })


                        })
                    }
                    else {
                        //sending mail only when flight one way is booked
                        User.findOne({
                            where: {
                                userid: req.session.userid
                            }
                        }).then((userdata) => {
                            Usertravel.findOne({
                                bookingid: req.body.uuid1
                            }).then((usertraveldata) => {
                                let useremail = userdata.dataValues.emailId
                                let mailOptions = {
                                    from: 'easygowebservice@gmail.com',
                                    to: `${emailidofuser}`,
                                    subject: 'YOUR BOOKING WAS SUCCESSFUL',
                                    html: `
                                      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        .footer-padding {
            padding-bottom: 60px;
        }

        .footer {
            position: absolute;
            text-align: center;
            bottom: 0;
            width: 100%;
            height: 60px;
            background-color: #1abc9c;
        }

        .footer p {
            margin-top: 25px;
            font-size: 12px;
          color: #fff;
          font-size: 20px;
        }
        </style>
    </head>
    <body>
        <h1>Thankyou! for Easygo, Your booking is confirmed</h1>
        <h2>Here are the details :</h2>
        <hr>
        <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
            <tbody>
              <tr>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Booking id</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.bookingid}</strong></td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">FlightID</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.flightid}</strong></td>
              </tr>
              <tr>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Flight Name</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.flightname}</strong></td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Price</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.price}</strong></td>
            </tr>
              <tr>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From Time</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.fromtime}</strong></td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To Time</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.totime}</strong></td>
              </tr>
              <tr>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of Adult</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of children</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
            </tr>
            <tr>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.from}</strong></td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.to}</strong></td>
          </tr>
            </tbody>
        </table>
        <hr/>
        <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
        <tbody>
          <tr>
            <td valign="top"
              style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: left; padding-left: 1rem;">
              <strong>TOTAL PRICE</strong></td>
            <td valign="top"
              style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: end; padding-right: 5rem;">
              <strong style="font-size:28px">${Number(data1.dataValues.price)}₹</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <hr>
    </body>
    <footer>
    <div class="footer-padding"></div>
    <div class="footer">
      <p>Happy Journey 😁 </p>
    </div>
  </div>
    </footer>
    </html>


                                        `
                                }
                                transporter.sendMail(mailOptions, (err, data) => {
                                    if (err) {
                                        console.log("error");
                                    }
                                    else {
                                        console.log("sent");
                                    }

                                })


                            })




                        })



                    }
                })



        })
    }
    else if (req.body.mode == "TRAIN") {
        //train update
        console.log(req.body.uuid1);
        console.log(req.body.uuid2);
        console.log(req.body.hoteluuid);

        trainbooking.findOne({
            where: {
                bookingid: req.body.uuid1
            }
        })
            .then((data1) => {

                data1.update({ paymentstatus: 1 })
                    .then(() => {
                        console.log("first one updated");


                        if (req.body.uuid2 != undefined) {
                            trainbooking.findOne({
                                where: {
                                    bookingid: req.body.uuid2
                                },
                                order: [
                                    ['createdAt', 'DESC']
                                ]
                            }).then((data3) => {
                                data3.update({ paymentstatus: 1 })
                                    .then(() => {
                                        console.log("second one updated");
                                        hotelbooking.findOne({
                                            where: {
                                                bookingid: req.body.hoteluuid
                                            }
                                        }).then((data4) => {
                                            data4.update({ paymentstatus: 1 })
                                                .then(() => {
                                                    console.log("hotel updated");
                                                    //send mail here for hotel booking with flight
                                                    //data1 -- going data3 -- return data4 -- hotel

                                                    Usertravel.findOne(({
                                                        bookingid: req.body.uuid1
                                                    })).then((usertraveldata) => {

                                                        let mailOptions = {
                                                            from: 'easygowebservice@gmail.com',
                                                            to: `${emailidofuser}`,
                                                            subject: 'YOUR BOOKING WAS SUCCESSFUL',
                                                            html: `
                                                                    <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Document</title>
                                    <style>
                                    .footer-padding {
                                        padding-bottom: 60px;
                                    }

                                    .footer {
                                        position: absolute;
                                        text-align: center;
                                        bottom: 0;
                                        width: 100%;
                                        height: 60px;
                                        background-color: #1abc9c;
                                    }

                                    .footer p {
                                        margin-top: 25px;
                                        font-size: 12px;
                                      color: #fff;
                                      font-size: 20px;
                                    }
                                    </style>
                                </head>
                                <body>
                                    <h1>Thankyou! for Easygo, Your booking is confirmed</h1>

                                    <h2>Here are the details :</h2>
                                    <hr/>

                                    <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                                        <tbody>
                                          <tr>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Booking id</td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.bookingid}</strong></td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Train Class</td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.class}</strong></td>
                                          </tr>
                                          <tr>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Train Name</td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.trainname}</strong></td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Price</td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.price}</strong></td>
                                        </tr>
                                          <tr>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From Time</td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.fromtime}</strong></td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To Time</td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.totime}</strong></td>
                                          </tr>
                                          <tr>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of Adult</td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of children</td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.children}</strong></td>
                                        </tr>
                                        <tr>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From</td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.from}</strong></td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To</td>
                                        <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.to}</strong></td>
                                      </tr>
                                      <tr>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Name</td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelname}</strong></td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Class</td>
                                      <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelclass}</strong></td>
                                    </tr>
                                    <tr>
                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Address</td>
                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hoteladdress}</strong></td>
                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Destination</td>
                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.destination}</strong></td>
                                  </tr>
                                  <tr>
                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel price</td>
                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelprice}</strong></td>
                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Return Price</td>
                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data3.dataValues.price}</strong></td>
                                </tr>
                                </tbody>
                                    </table>
                                    <hr/>
                                    <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                                    <tbody>
                                      <tr>
                                        <td valign="top"
                                          style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: left; padding-left: 1rem;">
                                          TOTAL PRICE</td>
                                        <td valign="top"
                                          style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: end; padding-right: 5rem;">
                                          <strong style="font-size:28px">${Number(data3.dataValues.price) + Number(data4.dataValues.hotelprice) + Number(data1.dataValues.price)}₹</strong>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <hr>
                                </body>
                                <footer>
                                <div class="footer-padding"></div>
                                <div class="footer">
                                  <p>Happy Journey 😁 </p>
                                </div>
                              </div>
                                </footer>
                                </html>

                                                                    `
                                                        }
                                                        transporter.sendMail(mailOptions, (err, data) => {
                                                            if (err) {
                                                                console.log("error");
                                                            }
                                                            else {
                                                                console.log("sent");
                                                            }

                                                        })


                                                    })


                                                })
                                        })

                                    })


                            })
                        }
                        else {
                            //send mail here for train single booking
                            User.findOne({
                                where: {
                                    userid: req.session.userid
                                }
                            }).then((userdata) => {
                                Usertravel.findOne({
                                    bookingid: req.body.uuid1
                                }).then((usertraveldata) => {
                                    let useremail = userdata.dataValues.emailId
                                    let mailOptions = {
                                        from: 'easygowebservice@gmail.com',
                                        to: `${emailidofuser}`,
                                        subject: 'YOUR BOOKING WAS SUCCESSFUL',
                                        html: `
                                        <!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                            <meta charset="UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <title>Document</title>
                                            <style>
                                            .footer-padding {
                                                padding-bottom: 60px;
                                            }

                                            .footer {
                                                position: absolute;
                                                text-align: center;
                                                bottom: 0;
                                                width: 100%;
                                                height: 60px;
                                                background-color: #1abc9c;
                                            }

                                            .footer p {
                                                margin-top: 25px;
                                                font-size: 12px;
                                              color: #fff;
                                              font-size: 20px;
                                            }
                                            </style>
                                        </head>
                                        <body>
                                            <h1>Thankyou! for Easygo, Your booking is confirmed</h1>
                                            <h2>Here are the details :</h2>
                                              <hr>
        <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
            <tbody>
              <tr>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Booking id</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.bookingid}</strong></td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Train class</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.class}</strong></td>
              </tr>
              <tr>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Train Name</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.trainname}</strong></td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Price</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.price}</strong></td>
            </tr>
              <tr>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From Time</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.fromtime}</strong></td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To Time</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.totime}</strong></td>
              </tr>
              <tr>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of Adult</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of children</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
            </tr>
            <tr>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.from}</strong></td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.to}</strong></td>
          </tr>
            </tbody>
        </table>
        <hr/>
        <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
        <tbody>

          <tr>
            <td valign="top"
              style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: left; padding-left: 1rem;">
              <strong>TOTAL PRICE</strong></td>
            <td valign="top"
              style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: end; padding-right: 5rem;">
              <strong style="font-size:28px;">${Number(data1.dataValues.price)}₹</strong>
            </td>
          </tr>
          </tbody>
      </table>
      <hr>
    </body>
    <footer>
    <div class="footer-padding"></div>
    <div class="footer">
      <p>Happy Journey 😁 </p>
    </div>
  </div>
    </footer>
    </html>


                                        `
                                    }
                                    transporter.sendMail(mailOptions, (err, data) => {
                                        if (err) {
                                            console.log("error");
                                        }
                                        else {
                                            console.log("sent");
                                        }

                                    })


                                })




                            })




                        }
                    })



            })



    }
    else {
        //bus update
        busbooking.findOne({
            where: {
                bookingid: req.body.uuid1
            }
        })
            .then((data1) => {

                data1.update({ paymentstatus: 1 })
                    .then(() => {
                        console.log("first one updated");


                        if (req.body.uuid2 != undefined) {
                            busbooking.findOne({
                                where: {
                                    bookingid: req.body.uuid2
                                },
                                order: [
                                    ['createdAt', 'DESC']
                                ]
                            }).then((data3) => {
                                data3.update({ paymentstatus: 1 })
                                    .then(() => {
                                        console.log("second one updated");
                                        hotelbooking.findOne({
                                            where: {
                                                bookingid: req.body.hoteluuid
                                            }
                                        }).then((data4) => {
                                            data4.update({ paymentstatus: 1 })
                                                .then(() => {
                                                    console.log("hotel updated");
                                                    //send mail here for bus and hotel
                                                    //data1 -- going data3 -- return data4 -- hotel

                                                    Usertravel.findOne(({
                                                        bookingid: req.body.uuid1
                                                    })).then((usertraveldata) => {

                                                        let mailOptions = {
                                                            from: 'easygowebservice@gmail.com',
                                                            to: `${emailidofuser}`,
                                                            subject: 'YOUR BOOKING WAS SUCCESSFUL',
                                                            html: `
                                                                            <!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                            <meta charset="UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <title>Document</title>
                                            <style>
                                            .footer-padding {
                                                padding-bottom: 60px;
                                            }

                                            .footer {
                                                position: absolute;
                                                text-align: center;
                                                bottom: 0;
                                                width: 100%;
                                                height: 60px;
                                                background-color: #1abc9c;
                                            }

                                            .footer p {
                                                margin-top: 25px;
                                                font-size: 12px;
                                              color: #fff;
                                              font-size: 20px;
                                            }
                                            </style>
                                        </head>
                                        <body>
                                            <h1>Thankyou! for Easygo, Your booking is confirmed</h1>

                                            <h2>Here are the details :</h2>
                                            <hr/>

                                            <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                                                <tbody>
                                                  <tr>
                                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Booking id</td>
                                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.bookingid}</strong></td>
                                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Bus Class</td>
                                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.class}</strong></td>
                                                  </tr>
                                                  <tr>
                                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Bus Name</td>
                                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.busname}</strong></td>
                                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Price</td>
                                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.price}</strong></td>
                                                </tr>
                                                  <tr>
                                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From Time</td>
                                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.fromtime}</strong></td>
                                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To Time</td>
                                                    <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.totime}</strong></td>
                                                  </tr>
                                                  <tr>
                                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of Adult</td>
                                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
                                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of children</td>
                                                  <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.children}</strong></td>
                                                </tr>
                                                <tr>
                                                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From</td>
                                                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.from}</strong></td>
                                                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To</td>
                                                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.to}</strong></td>
                                              </tr>
                                              <tr>
                                              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Name</td>
                                              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelname}</strong></td>
                                              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Class</td>
                                              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelclass}</strong></td>
                                            </tr>
                                            <tr>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Address</td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hoteladdress}</strong></td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel Destination</td>
                                            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.destination}</strong></td>
                                          </tr>
                                          <tr>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Hotel price</td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data4.dataValues.hotelprice}</strong></td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Return Price</td>
                                          <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data3.dataValues.price}</strong></td>
                                        </tr>
                                      </tbody>
                                            </table>
                                              <hr/>
                                            <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                                            <tbody>
                                              <tr>
                                                <td valign="top"
                                                  style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: left; padding-left: 1rem;">
                                                  <strong>TOTAL PRICE</strong></td>
                                                <td valign="top"
                                                  style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: end; padding-right: 5rem;">
                                                  <strong style="font-size:28px;">${Number(data3.dataValues.price) + Number(data4.dataValues.hotelprice) + Number(data1.dataValues.price)}₹</strong>
                                                </td>
                                              </tr>

                                            </tbody>
                                          </table>
                                          <hr>
                                        </body>
                                        <footer>
                                        <div class="footer-padding"></div>
                                        <div class="footer">
                                          <p>Happy Journey 😁 </p>
                                        </div>
                                      </div>
                                        </footer>
                                        </html>

                                                                            `
                                                        }
                                                        transporter.sendMail(mailOptions, (err, data) => {
                                                            if (err) {
                                                                console.log("error");
                                                            }
                                                            else {
                                                                console.log("sent");
                                                            }

                                                        })


                                                    })

                                                })
                                        })

                                    })


                            })
                        }
                        else {
                            //send mail here for bus single booking
                            User.findOne({
                                where: {
                                    userid: req.session.userid
                                }
                            }).then((userdata) => {
                                Usertravel.findOne({
                                    bookingid: req.body.uuid1
                                }).then((usertraveldata) => {
                                    let useremail = userdata.dataValues.emailId
                                    let mailOptions = {
                                        from: 'easygowebservice@gmail.com',
                                        to: `${emailidofuser}`,
                                        subject: 'YOUR BOOKING WAS SUCCESSFUL',
                                        html: `
                                        <!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                            <meta charset="UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <title>Document</title>
                                            <style>
                                            .footer-padding {
                                                padding-bottom: 60px;
                                            }

                                            .footer {
                                                position: absolute;
                                                text-align: center;
                                                bottom: 0;
                                                width: 100%;
                                                height: 60px;
                                                background-color: #1abc9c;
                                            }

                                            .footer p {
                                                margin-top: 25px;
                                                font-size: 12px;
                                              color: #fff;
                                              font-size: 20px;
                                            }
                                            </style>
                                        </head>
                                        <body>
                                            <h1>Thankyou! for Easygo, Your booking is confirmed</h1>
                                            <h2>Here are the details :</h2>
                                             <hr>
        <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
            <tbody>
              <tr>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Booking id</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.bookingid}</strong></td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Bus class</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.class}</strong></td>
              </tr>
              <tr>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Bus Name</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.busname}</strong></td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">Price</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.price}</strong></td>
            </tr>
              <tr>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From Time</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.fromtime}</strong></td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To Time</td>
                <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${data1.dataValues.totime}</strong></td>
              </tr>
              <tr>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of Adult</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">No. of children</td>
              <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.adult}</strong></td>
            </tr>
            <tr>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">From</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.from}</strong></td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;">To</td>
            <td valign="top" style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><strong>${usertraveldata.dataValues.to}</strong></td>
          </tr>
            </tbody>
        </table>
        <hr/>
        <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
        <tbody>
          <tr>
            <td valign="top"
              style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: left; padding-left: 1rem;">
              <strong>TOTAL PRICE</strong></td>
            <td valign="top"
              style="padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px; text-align: end; padding-right: 5rem;">
              <strong style="font-size:28px;">${Number(data1.dataValues.price)}₹</strong>
            </td>
          </tr>

        </tbody>
      </table>
          <hr>
    </body>
    <footer>
    <div class="footer-padding"></div>
    <div class="footer">
      <p>Happy Journey 😁 </p>
    </div>
  </div>
    </footer>
    </html>


                                        `
                                    }
                                    transporter.sendMail(mailOptions, (err, data) => {
                                        if (err) {
                                            console.log("error");
                                        }
                                        else {
                                            console.log("sent");
                                        }

                                    })


                                })




                            })


                        }
                    })



            })

    }
    res.send("allworkdone");

})


app.post("/summarytransportdetails", (req, res) => {
    console.log(req.body.mode);
    console.log(req.body.returndate);

    if (req.body.mode == 'PLANE') {
        if (req.body.returndate == "undefined") {
            flightbooking.findOne({
                where: {
                    userid: req.session.userid
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
                .then((user) => {
                    console.log(user);
                    return res.send(user.dataValues)
                })
        }
        else {
            console.log("here");
            flightbooking.findAll({
                where: {
                    userid: req.session.userid
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then((user) => {
                console.log("------------------here-------------------");
                console.log(user);
                console.log("----here is what you want in life child ----------------------------");
                console.log(user[1]);
                console.log(user[1].dataValues);
                let data1 = user[1].dataValues;
                let priceofreturnbook = user[0].dataValues.price;
                let returnuuid = user[0].bookingid;
                //   res.send({
                //       data1,
                //       priceofreturnbook
                //   })
                hotelbooking.findOne({
                    where: {
                        userid: req.session.userid
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
                    .then((user) => {
                        console.log(user);
                        let hoteldetails = user.dataValues
                        return res.send({
                            data1,
                            priceofreturnbook,
                            hoteldetails,
                            returnuuid
                        })
                    })

            })
        }
    }
    else if (req.body.mode == 'TRAIN') {
        if (req.body.returndate == "undefined") {
            trainbooking.findOne({
                where: {
                    userid: req.session.userid
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
                .then((user) => {
                    console.log(user);
                    return res.send(user.dataValues)
                })
        }
        else {
            console.log("here");
            trainbooking.findAll({
                where: {
                    userid: req.session.userid
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then((user) => {
                console.log("------------------here-------------------");
                console.log(user);
                console.log("----here is what you want in life child ----------------------------");
                console.log(user[1]);
                console.log(user[1].dataValues);
                let data1 = user[1].dataValues;
                let priceofreturnbook = user[0].dataValues.price;
                let returnuuid = user[0].bookingid;
                //   res.send({
                //       data1,
                //       priceofreturnbook
                //   })
                hotelbooking.findOne({
                    where: {
                        userid: req.session.userid
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
                    .then((user) => {
                        console.log(user);
                        let hoteldetails = user.dataValues
                        return res.send({
                            data1,
                            priceofreturnbook,
                            hoteldetails,
                            returnuuid
                        })
                    })

            })
        }
    }
    else {
        if (req.body.returndate == "undefined") {
            busbooking.findOne({
                where: {
                    userid: req.session.userid
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
                .then((user) => {
                    console.log(user);
                    return res.send(user.dataValues)
                })
        }
        else {
            console.log("here");
            busbooking.findAll({
                where: {
                    userid: req.session.userid
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then((user) => {
                console.log("------------------here-------------------");
                console.log(user);
                console.log("----here is what you want in life child ----------------------------");
                console.log(user[1]);
                console.log(user[1].dataValues);
                let data1 = user[1].dataValues;
                let priceofreturnbook = user[0].dataValues.price;
                let returnuuid = user[0].bookingid;
                //   res.send({
                //       data1,
                //       priceofreturnbook
                //   })
                hotelbooking.findOne({
                    where: {
                        userid: req.session.userid
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
                    .then((user) => {
                        console.log(user);
                        let hoteldetails = user.dataValues
                        return res.send({
                            data1,
                            priceofreturnbook,
                            hoteldetails,
                            returnuuid
                        })
                    })

            })
        }
    }

})





app.post("/hotelbooking", (req, res) => {
    console.log(req.body);
    hotelbooking.create({
        userid: `${req.session.userid}`,
        bookingid: `${req.body.bookingid}`,
        paymentstatus: `${0}`,
        hotelname: `${req.body.hotelname}`,
        hotelclass: `${req.body.hotelclass}`,
        hoteladdress: `${req.body.hoteladdress}`,
        destination: `${req.body.destinationvalue}`,
        hotelprice: `${req.body.hotelprice}`
    })
        .then(() => {
            res.send("data")
        })
})


app.post("/flightbooking", (req, res) => {
    console.log("---------BADABOOMBOOMBOOM-----------");

    console.log(req.body);
    let { price, fromtime, totime, brand, flightid, bookingid } = req.body;

    flightbooking.create({
        userid: `${req.session.userid}`,
        bookingid: `${bookingid}`,
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
    let { price, fromtime, totime, brand, class1, bookingid } = req.body;

    trainbooking.create({
        userid: `${req.session.userid}`,
        bookingid: `${bookingid}`,
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
    let { price, fromtime, totime, brand, class1, bookingid } = req.body;

    busbooking.create({
        userid: `${req.session.userid}`,
        bookingid: `${bookingid}`,
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
            bookingid: `${short.generate()}`,
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
    let inputpassword = md5(req.body.password);

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
    let passwordfield = md5(req.body.password);
    let confirmpasswordfield = md5(req.body.confirmpassword);

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
                        // asyncCall();
                        // asyncCall2();
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

    res.status(400).render("404 -EG");
    //page to be designed at last
})
