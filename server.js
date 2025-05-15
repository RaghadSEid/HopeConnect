const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/images', express.static('images'));


const orphanRoutes = require('./routes/orphanRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const sponsorshipRoutes = require('./routes/sponsorshipRoutes');
const updateRoutes = require('./routes/updateRoutes');
const donationRoutes = require('./routes/donationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/orphans', orphanRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/sponsorships', sponsorshipRoutes);
app.use('/updates', updateRoutes);
app.use('/donations', donationRoutes);
app.use('/payments', paymentRoutes);



// نقطة اختبار السيرفر
app.get('/', (req, res) => {
    res.send('خدمة HopeConnect شغالة');
});
//http://localhost:3000/



app.listen(PORT, () => {
    console.log(`السيرفر شغال على http://localhost:${PORT}`);
});
