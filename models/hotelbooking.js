const connection = require("../connection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const hotelbooking = connection.define('hotelbooking', {
    userid: {
        type: DataTypes.INTEGER
    },
    bookingid:{
        type: DataTypes.STRING,
        allowNull: false
    },
    hotelname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hotelclass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hoteladdress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hotelprice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentstatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});
hotelbooking.removeAttribute('id');
console.log(hotelbooking);
module.exports = hotelbooking;