const db = require('../config/db');


exports.findVolunteersByRequest = (request_id, callback) => {
    const sql = `
        SELECT v.volunteer_id, u.name, u.email, v.availability, s.name AS skill_name
        FROM human_requests hr
        JOIN volunteer_skills vs ON hr.skill_id = vs.skill_id
        JOIN volunteers v ON vs.volunteer_id = v.volunteer_id
        JOIN users u ON v.user_id = u.user_id
        JOIN skills s ON vs.skill_id = s.skill_id
        WHERE hr.request_id = ?
    `;
    db.query(sql, [request_id], callback);
};

exports.insertVolunteerMatches = (volunteerMatches, callback) => {
    const sql = `INSERT INTO volunteer_requests (volunteer_id, request_id) VALUES ?`;
    db.query(sql, [volunteerMatches], callback);
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

exports.findVolunteersByRequest2 = (request_id, callback) => {
    const sql = `
        SELECT volunteer_id
        FROM volunteer_requests
        WHERE id = ?
    `;
    db.query(sql, [request_id], callback);
};

exports.getOrphanageByRequestId = (request_id, callback) => {
    const sql = `
        SELECT orphanage_id
        FROM human_requests
        WHERE request_id = (
            SELECT request_id
            FROM volunteer_requests
            WHERE id = ?
        )
    `;

    db.query(sql, [request_id], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null);

        const orphanage_id = results[0].orphanage_id;
        callback(null, { orphanage_id }); 
    });
};


