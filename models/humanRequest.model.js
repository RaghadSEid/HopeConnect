const db = require('../config/db');

exports.insertRequest = ({ orphanage_id, description, is_emergency = 'False', skill_id }, callback) => {
    const sql = `
		INSERT INTO human_requests (orphanage_id, description, is_emergency, skill_id, date_requested)
		VALUES (?, ?, ?, ?, NOW())
	`;
    db.query(sql, [orphanage_id, description, is_emergency, skill_id], callback);
};

exports.getAllRequests = (callback) => {
    const sql = `
    SELECT hr.*, s.name AS skill_name
    FROM human_requests hr
    LEFT JOIN skills s ON hr.skill_id = s.skill_id
    ORDER BY hr.date_requested DESC
  `;
    db.query(sql, callback);
};
exports.updateRequestStatus = (request_id, status, callback) => {
    const sql = `UPDATE volunteer_requests SET status = ? WHERE request_id = ?`;
    db.query(sql, [status, request_id], callback);
};
