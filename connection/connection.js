const sequelize = require("sequelize");

//easygo -- name of db 
//root -- username of mysql
//Roaringlyken@23 -- password of mysql
const connection = new sequelize('easygo','root','Roaringlyken@23',{
    dialect:'mysql'
})

module.exports = connection;