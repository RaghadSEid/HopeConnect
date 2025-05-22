const db = require('../config/db');

exports.getAll = (callback) => {
    db.query('SELECT * FROM logistics_tasks', callback);
};

exports.getById = (id, callback) => {
    db.query('SELECT * FROM logistics_tasks WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
    const query = `
    INSERT INTO logistics_tasks 
    (donation_id, delivery_id, origin_address, destination_address, title, description, scheduled_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
    const params = [
        data.donation_id,
        data.delivery_id,
        data.origin_address,
        data.destination_address,
        data.title,
        data.description,
        data.scheduled_at,
        data.status || 'pending',
    ];
    db.query(query, params, callback);
};

exports.update = (id, data, callback) => {
    const query = `
    UPDATE logistics_tasks SET 
      donation_id = ?, 
      delivery_id = ?, 
      origin_address = ?, 
      destination_address = ?, 
      title = ?, 
      description = ?, 
      scheduled_at = ?, 
      status = ?
    WHERE id = ?
  `;
    const params = [
        data.donation_id,
        data.delivery_id,
        data.origin_address,
        data.destination_address,
        data.title,
        data.description,
        data.scheduled_at,
        data.status,
        id,
    ];
    db.query(query, params, callback);
};

exports.delete = (id, callback) => {
    db.query('DELETE FROM logistics_tasks WHERE id = ?', [id], callback);
};

