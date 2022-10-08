const { Sequelize } = require('sequelize');

const connect = new Sequelize('agar', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});


connect.authenticate()
.then(()=> console.log("\nDatabase Connected!\n"))
.catch((err)=>console.log("Ther is an error connecting db",err));

module.exports = connect;