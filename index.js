const express = require('express');
const cors = require('cors');
const multer = require('multer');
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
const HelpCategoryRoutes = require('./routes/HelpCategoryRoutes');
const Period = require('./routes/Period');
const Priority = require('./routes/PriorityRoutes');
const TaskRoutes  = require('./routes/TaskRoutes.js');
const StuckRoutes  = require('./routes/StuckRoutes.js');
//user Routes
app.use('/user', UserRoutes);
//company routes
app.use('/company', CompanyRoutes)
// announcement
app.use('/announcement', createAnnouncementRoutes)
// help category 
app.use('/helpcategory',HelpCategoryRoutes);
// period 
app.use('/period', Period);
// priority
app.use('/priority', Priority);
// task
app.use('/task', TaskRoutes);
// stuck
app.use('/stuck', StuckRoutes);
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
