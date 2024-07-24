const Sequelize = require("sequelize");
// const User = require("../models/UserModels");
// const Announcement = require("../models/createAnnouncementModels");
const sequelize = new Sequelize(
        "scalability",
        "root",
        "password",
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);
sequelize.sync({alert: true}).then(() => {
    console.log('database connected successfully');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

module.exports = sequelize;