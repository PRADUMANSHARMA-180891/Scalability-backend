require('dotenv').config();
const express = require('express');
const cors = require('cors');
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
const HuddleRoutes  = require('./routes/HuddleRoutes.js');
const SuggestionRoutes  = require('./routes/SuggestionRoutes.js');
const MetricRoutes  = require('./routes/MetricRoutes.js');
const SendInvitationRoutes =require('./routes/SendInvitationRoutes.js');
const kpiListingRoutes = require('./routes/KpiListingRoutes.js')
const CompanySettingsRoutes = require('./routes/CompanySettingsRoutes.js');
const SurveyRoutes = require('./routes/SurveyRoutes.js');
const EnpsRoutes = require('./routes/EnpsRoutes.js');
const StrategyRoutes = require('./routes/StrategyRoutes.js');
const OnePageStrategyRoutes = require('./routes/OnePageStrategyRoutes.js');
const CoachRoutes = require('./routes/CoachRoutes.js');
const Share = require('./routes/ShareRoutes');
const ContactUsRoutes = require('./routes/ContactUsRoutes.js')
const PersonalPlanRoutes = require('./routes/OnePagePersonalPlanRoutes.js')
const OneYearActiveRoutes = require('./routes/OneYearActiveRoutes.js');
const NintyDaysAction = require('./routes/NintyDaysActionRoutes.js');

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
// huddle
app.use('/huddle', HuddleRoutes);
// suggestion
app.use('/suggestion', SuggestionRoutes);
// metric
app.use('/metric', MetricRoutes);
// invitation
app.use('/invitation', SendInvitationRoutes);
// 
app.use('/kpi', kpiListingRoutes);
// company Settings
app.use('/tag', CompanySettingsRoutes);
// Survey 
app.use('/survey', SurveyRoutes);
// Enps
app.use('/enps', EnpsRoutes);
// startegy
app.use('/strategy', StrategyRoutes);
// one page strategy plan
app.use('/strategy', OnePageStrategyRoutes);
// coach
app.use('/coach', CoachRoutes);
// share 
app.use('/share', Share);
// contact us
app.use('/contactus',ContactUsRoutes);
// one page personal plan
app.use('/personal-plan',PersonalPlanRoutes)
// One Year Active
app.use('/oneyearactive',OneYearActiveRoutes)
// ninty days Action
app.use('/nintydaysaction', NintyDaysAction)

// Start server

const PORT = process.env.PORT; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
