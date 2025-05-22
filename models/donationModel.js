// models/donationModel.js
const db = require('../config/db'); 

exports.createDonation = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO donations (
        donor_id, orphanage_id, 
        category_name, category_description,
        is_emergency
        ) VALUES (?, ?, ?, ?, ?)
      `

        const values = [
            data.donor_id,
            data.orphanage_id,
            data.amount,
            data.category_name,
            data.category_description,
            data.is_emergency || 'False'
        ];

        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.getAllDonations = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM donations ORDER BY donation_date DESC`;
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getDonationsByCategory = (category_name) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
              d.*, 
              u.name AS donor_name, 
              o.name AS orphanage_name
            FROM donations d
            JOIN donors dn ON d.donor_id = dn.donor_id
            JOIN users u ON dn.user_id = u.user_id
            JOIN orphanages o ON d.orphanage_id = o.orphanage_id
            WHERE d.category_name = ?
            ORDER BY d.donation_date DESC
        `;
        db.query(sql, [category_name], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getDonationsByDonor = (donor_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
              d.*, 
              u.name AS donor_name,
              o.name AS orphanage_name
            FROM donations d
            JOIN donors dn ON d.donor_id = dn.donor_id
            JOIN users u ON dn.user_id = u.user_id
            JOIN orphanages o ON d.orphanage_id = o.orphanage_id
            WHERE d.donor_id = ?
            ORDER BY d.donation_date DESC
        `;
        db.query(sql, [donor_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getDonationsNoImpact = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM donations WHERE impact_description IS NULL ORDER BY donation_date DESC`;
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};



// تحديث مرن لأي حقل
exports.updateDonationFields = (donation_id, fields) => {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(fields);
        const values = Object.values(fields);

        if (keys.length === 0) {
            return reject(new Error("No fields to update"));
        }

        const sql = `
            UPDATE donations
            SET ${keys.map(key => `${key} = ?`).join(", ")}
            WHERE donation_id = ?
        `;

        db.query(sql, [...values, donation_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


// Get user_id by donation_id
exports.getUserIdByDonationId = (donation_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT u.user_id
            FROM donations d
            JOIN donors dn ON d.donor_id = dn.donor_id
            JOIN users u ON dn.user_id = u.user_id
            WHERE d.donation_id = ?
        `;
        db.query(sql, [donation_id], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                resolve(results[0].user_id);
            } else {
                resolve(null); // donation not found
            }
        });
    });
};


// Insert notification
exports.createNotification = (user_id, message) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO notifications (user_id, message)
            VALUES (?, ?)
        `;
        db.query(sql, [user_id, message], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};






