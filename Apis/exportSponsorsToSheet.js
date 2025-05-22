const { google } = require('googleapis');
const path = require('path');
const Sponsor = require('../models/sponsorModel'); 
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '../config/service-account.json');
const spreadsheetId = '1LyeTOcVIj1_58-1lWjqw8kZd1W7PN97Vq2FjTqYr8NY';

async function exportSponsors() {
    console.log('exportSponsors started'); 
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: SERVICE_ACCOUNT_FILE,
            scopes: SCOPES,
        });

        const sheets = google.sheets({ version: 'v4', auth });


        const sponsors = await Sponsor.getAll(); 

        const values = [
            ['ID', 'Name', 'Email', 'Phone', 'Location', 'Status'],
            ...sponsors.map(s => [
                s.id,
                s.name,
                s.email,
                s.phone,
                s.location,
                s.status,
            ]),
        ];
        const resource = { values };
        console.log(values);

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Sheet1!A1',
            valueInputOption: 'RAW',
            resource,
        });

        return { success: true, count: sponsors.length };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = { exportSponsors };
