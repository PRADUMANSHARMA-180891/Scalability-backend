const Sequelize = require("sequelize");
const sequelize = new Sequelize(
        "scalability",
        "root",
        "",
    {
        host: 'localhost',
        port:  3307, 
        dialect: 'mysql',
    }
);
sequelize.sync({alert: true}).then(() => {
    console.log('database connected successfully');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

module.exports = sequelize;