const connection = require("../connection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const Counter = connection.define('Bookingcounter', {
    flighttickets: {
        type: DataTypes.INTEGER,
        allowNull : false

    },
    traintickets: {
        type: DataTypes.INTEGER,
    },
    bustickets: {
        type: DataTypes.INTEGER,
    },
    hotelbookings: {
        type: DataTypes.INTEGER,
    }
},{
    timestamps: false,
});

Counter.removeAttribute('id');

console.log(Counter);
module.exports = Counter;