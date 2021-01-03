const connection = require("../connection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const Usertravel = connection.define('usertravel', {
    userid: {
        type: DataTypes.INTEGER
    },
    bookingid:{
        type: DataTypes.STRING,
        allowNull: false
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adult: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    children: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    departuredate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    returndate: {
        type: DataTypes.STRING
    }
});
Usertravel.removeAttribute('id');
console.log(Usertravel);
module.exports = Usertravel;