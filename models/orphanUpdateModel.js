const db = require('../config/db');

const OrphanUpdate = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM orphan_updates', (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getByOrphanId: (orphanId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM orphan_updates WHERE orphan_id = ?', [orphanId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO orphan_updates (orphan_id, update_type, description, image_url) VALUES (?, ?, ?, ?)';
            db.query(query, [data.orphan_id, data.update_type, data.description, data.image_url], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
        });
    },

    update: (id, data) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE orphan_updates SET update_type = ?, description = ?, image_url = ? WHERE id = ?';
            db.query(query, [data.update_type, data.description, data.image_url, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM orphan_updates WHERE id = ?', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};

module.exports = OrphanUpdate;
