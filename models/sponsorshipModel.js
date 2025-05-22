const db = require('../config/db');

const Sponsorship = {
    getAll: () => {
        const query = `
    SELECT s.*, o.name AS orphan_name, u.name AS sponsor_name
    FROM sponsorships s
    LEFT JOIN orphans o ON s.orphan_id = o.id
    LEFT JOIN sponsors sp ON s.sponsor_id = sp.id
    LEFT JOIN users u ON sp.user_id = u.user_id
  `;
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },


    getByOrphanId: (orphanId) => {
        const query = `
    SELECT s.*, o.name AS orphan_name, u.name AS sponsor_name
    FROM sponsorships s
    LEFT JOIN orphans o ON s.orphan_id = o.id
    LEFT JOIN sponsors sp ON s.sponsor_id = sp.id
    LEFT JOIN users u ON sp.user_id = u.user_id
    WHERE s.orphan_id = ?
  `;
        return new Promise((resolve, reject) => {
            db.query(query, [orphanId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },


    getBySponsorId: (sponsorId) => {
        const query = `
    SELECT s.*, o.name AS orphan_name, u.name AS sponsor_name
    FROM sponsorships s
    LEFT JOIN orphans o ON s.orphan_id = o.id
    LEFT JOIN sponsors sp ON s.sponsor_id = sp.id
    LEFT JOIN users u ON sp.user_id = u.user_id
    WHERE s.sponsor_id = ?
  `;
        return new Promise((resolve, reject) => {
            db.query(query, [sponsorId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },


    create: (data) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO sponsorships SET ?', data, (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
        });
    },

    update: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE sponsorships SET ? WHERE id = ?', [data, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    updateStatus: (id, status) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE sponsorships SET status = ? WHERE id = ?';
            db.query(query, [status, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },


    softDelete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE sponsorships SET status = "Not Available" WHERE id = ?';
            db.query(query, [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

module.exports = Sponsorship;
