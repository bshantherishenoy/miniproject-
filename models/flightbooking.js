const connection = require("../connection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const flightbooking = connection.define('flightbooking', {
    userid: {
        type: DataTypes.INTEGER
    },
    flightid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flightname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fromtime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentstatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});
flightbooking.removeAttribute('id');
console.log(flightbooking);
module.exports = flightbooking;