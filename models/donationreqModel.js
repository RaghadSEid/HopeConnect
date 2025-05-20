const db = require('../config/db');

exports.getAllLogisticReq = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM donation_requests ORDER BY requested_at DESC`;
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.createLogisticReq = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO donation_requests 
            (orphanage_id, request_type, description, status, requested_at, is_emergency)
            VALUES (?, ?, ?, ?, ?, ? )`;

        const values = [
            data.orphanage_id,
            data.request_type,
            data.description || null,
            data.delivery_location,
            data.status || 'pending',
            data.requested_at || new Date(),
            data.delivered_at || null,
            data.is_emergency || false
        ];

        db.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
