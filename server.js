const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const donationRoutes = require('./routes/donationRoutes.js'); 
const notificationRoutes = require('./routes/notificationRoutes.js');
const donationReqs = require('./routes/donationReqRoutes.js');
const volunteer = require('./routes/volunteerRoutes.js');
const skillRoutes = require('./routes/skill.routes');
const humanRequestRoutes = require('./routes/humanRequest.routes');
const app = express();
const PORT = 3000;
const matchRoutes = require('./routes/match.routes');


app.use(bodyParser.json());

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
    res.send('خدمة HopeConnect شغالة');
});
// http://localhost:3000/

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
