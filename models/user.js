const connection = require("../connection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const User = connection.define('userdata', {
    userid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

 console.log(User); 
  module.exports = User;