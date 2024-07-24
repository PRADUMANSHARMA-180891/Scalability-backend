const express = require('express');
const cors = require('cors');
const multer = require('multer')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const sequelize = require('./Config/DBs.js');
// user ulr
const UserRoutes = require('./routes/UserRoutes');
// company uls
const CompanyRoutes = require("./routes/CompanyRoutes");
// Announcement uls
const createAnnouncementRoutes =require("./routes/createAnnouncementRoutes");
// const createAnnouncement = require('./controllers/createAnnouncementController.js');
// sequelize.sync({alter: true}).then(() => {
//   console.log('database connected successfully');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });
//user Routes
app.use('/user', UserRoutes);
//company routes
app.use('/company', CompanyRoutes)
// announcement
app.use('/announcement', createAnnouncementRoutes)
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
