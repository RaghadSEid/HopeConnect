const db = require('../config/db');

exports.getAllNotifications = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM notifications ORDER BY created_at DESC`; 
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};


exports.getNotificationsByDonorId = (donor_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT n.*
            FROM notifications n
            JOIN users u ON n.user_id = u.user_id
            JOIN donors d ON d.user_id = u.user_id
            WHERE d.donor_id = ?
            ORDER BY n.created_at DESC
        `;
        db.query(sql, [donor_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.sendEmergencyNotificationsToAllUsers = () => {
    return new Promise((resolve, reject) => {
        const message = 'Emergency: A new urgent campaign needs your support ,Plese help as if you can ^_^ ';

        const sql = `
            INSERT INTO notifications (user_id, message)
            SELECT user_id, ? FROM users
        `;

        db.query(sql, [message], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.notifyVolunteer = (volunteer_id, message, callback) => {
    const sql = `
        INSERT INTO notifications (user_id, message)
        SELECT u.user_id, ? FROM users u
        WHERE u.user_id = (
            SELECT user_id FROM volunteers WHERE volunteer_id = ?
        )
    `;
    db.query(sql, [message, volunteer_id], callback);
};

exports.notifyVolunteersByRequest = (request_id, message, callback) => {
    const sql = `
    INSERT INTO notifications (user_id, message)
    SELECT v.user_id, ?
    FROM volunteer_requests vr
    JOIN volunteers v ON vr.volunteer_id = v.volunteer_id
    WHERE vr.request_id = ?
  `;
    db.query(sql, [message, request_id], callback);
};

exports.notifyOrphanage = (orphanage_id, message, callback) => {
    const sql = `
        INSERT INTO notifications (user_id, message)
        SELECT u.user_id, ? FROM users u
        JOIN orphanages o ON o.user_id = u.user_id
        WHERE o.orphanage_id = ?
    `;
    db.query(sql, [message, orphanage_id], callback);
};