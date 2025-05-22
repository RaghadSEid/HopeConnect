const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/images', express.static('images'));

const orphanRoutes = require('./routes/orphanRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const sponsorshipRoutes = require('./routes/sponsorshipRoutes');
const orphanUpdateRoutes = require('./routes/orphanUpdateRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const donationPaymentsRoutes = require('./routes/donationPaymentsRoutes');
const partnersRoutes = require('./routes/partnerRoutes');
const deliveryTrackingRoutes = require('./routes/deliveryTrackingRoutes');
const logisticsTasksRoutes = require('./routes/logisticsRoutes');
const donationRoutes = require('./routes/donationRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const donationReqs = require('./routes/donationReqRoutes.js');
const volunteer = require('./routes/volunteerRoutes.js');
const skillRoutes = require('./routes/skill.routes');
const humanRequestRoutes = require('./routes/humanRequest.routes');
const matchRoutes = require('./routes/match.routes');



app.use('/api/orphans', orphanRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/sponsorships', sponsorshipRoutes);
app.use('/api/orphan-updates', orphanUpdateRoutes);
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
app.use('/api/donation-payments', donationPaymentsRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/delivery-tracking', deliveryTrackingRoutes);
app.use('/api/logistics-tasks', logisticsTasksRoutes);
app.use('/images', express.static('images'));
app.use('/api/donations', donationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/donationReqs', donationReqs);
app.use('/api/volunteers', volunteer);
app.use('/api/skills', skillRoutes); // كل مهارات تحت المسار هذا
// API لربط مهارات المتطوع
app.use('/api/volunteer-skills', skillRoutes);
app.use('/api/requests', humanRequestRoutes);
app.use('/api/match', matchRoutes);



app.get('/', (req, res) => {
    res.send('HopeConnect service is running');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
