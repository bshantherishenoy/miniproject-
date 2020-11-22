const sequelize = require("sequelize");

const connection = new sequelize('easygo','root','Roaringlyken@23',{
    dialect:'mysql'
})

module.exports = connection;