const Sequelize = require("sequelize");
// const User = require("../models/UserModels");
// const Announcement = require("../models/createAnnouncementModels");
const sequelize = new Sequelize(
        "scalability",
        "root",
        "",
    {
        host: '127.0.0.1',
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