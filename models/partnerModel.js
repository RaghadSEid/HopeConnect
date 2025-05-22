const db = require('../config/db');

exports.getAll = (callback) => {
    db.query('SELECT * FROM partners', callback);
};

exports.getById = (id, callback) => {
    db.query('SELECT * FROM partners WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
    const query = `
        INSERT INTO partners (name, contact_email, phone_number, partnership_type, description, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const params = [
        data.name,
        data.contact_email,
        data.phone_number,
        data.partnership_type,
        data.description
    ];
    db.query(query, params, callback);
};

exports.update = (id, data, callback) => {
    const query = `
        UPDATE partners
        SET name = ?, contact_email = ?, phone_number = ?, partnership_type = ?, description = ?, updated_at = NOW()
        WHERE id = ?
    `;
    const params = [
        data.name,
        data.contact_email,
        data.phone_number,
        data.partnership_type,
        data.description,
        id
    ];
    db.query(query, params, callback);
};

exports.delete = (id, callback) => {
    db.query('DELETE FROM partners WHERE id = ?', [id], callback);
};
