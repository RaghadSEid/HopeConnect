const db = require('../config/db');

const OrphanUpdate = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM orphan_updates';
        db.query(sql, (err, results) => {
            callback(err, results);
        });
    },

    getByOrphanId: (orphanId, callback) => {
        const sql = 'SELECT * FROM orphan_updates WHERE orphan_id = ?';
        db.query(sql, [orphanId], (err, results) => {
            callback(err, results);
        });
    },

    create: (data, callback) => {
        const sql = `INSERT INTO orphan_updates (orphan_id, update_type, description, image_url, created_at)
                 VALUES (?, ?, ?, ?, ?)`;
        const params = [data.orphan_id, data.update_type, data.description, data.image_url, data.created_at];
        db.query(sql, params, (err, results) => {
            callback(err, results);
        });
    },

    update: (id, data, callback) => {
        const sql = `UPDATE orphan_updates SET update_type = ?, description = ?, image_url = ?, created_at = ? WHERE id = ?`;
        const params = [data.update_type, data.description, data.image_url, data.created_at, id];
        db.query(sql, params, (err, results) => {
            callback(err, results);
        });
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM orphan_updates WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            callback(err, results);
        });
    }
};

module.exports = OrphanUpdate;
