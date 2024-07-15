const Sequelize = require("sequelize");

const sequelize = new Sequelize(
        "scalability",
        "root",
        "password",
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);


module.exports = sequelize;