const connection = require("../connection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const busbooking = connection.define('busbooking', {
    userid: {
        type: DataTypes.INTEGER
    },
    bookingid:{
        type: DataTypes.STRING,
        allowNull: false
    },
    busname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class: {
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
busbooking.removeAttribute('id');
console.log(busbooking);
module.exports = busbooking;