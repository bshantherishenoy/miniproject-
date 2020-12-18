const connection = require("../connection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const trainbooking = connection.define('trainbooking', {
    userid: {
        type: DataTypes.INTEGER
    },
    trainname: {
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
trainbooking.removeAttribute('id');
console.log(trainbooking);
module.exports = trainbooking;