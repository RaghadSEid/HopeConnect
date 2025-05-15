const db = require('../config/db');

const Donation = {
    getAll: (callback) => {
        db.query('SELECT * FROM donations', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM donations WHERE id = ?', [id], callback);
    },

    create: (donationData, callback) => {
        const sql = `INSERT INTO donations (donor_name, donor_email, category_name, amount, categories_description, quantity, donation_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            donationData.donor_name,
            donationData.donor_email,
            donationData.category_name,
            donationData.amount,
            donationData.categories_description,
            donationData.quantity,
            donationData.donation_date
        ];
        db.query(sql, values, callback);
    },

    update: (id, donationData, callback) => {
        const sql = `UPDATE donations SET donor_name = ?, donor_email = ?, category_name = ?, amount = ?, categories_description = ?, quantity = ?, donation_date = ? WHERE id = ?`;
        const values = [
            donationData.donor_name,
            donationData.donor_email,
            donationData.category_name,
            donationData.amount,
            donationData.categories_description,
            donationData.quantity,
            donationData.donation_date,
            id
        ];
        db.query(sql, values, callback);
    },

 
};

module.exports = Donation;
