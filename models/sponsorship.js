const db = require('../config/db');

const Sponsorship = {
    getAll: (callback) => {
        db.query('SELECT * FROM sponsorships', callback);
    },

    getByOrphanId: (orphanId, callback) => {
        db.query('SELECT * FROM sponsorships WHERE orphan_id = ?', [orphanId], callback);
    },

    getBySponsorId: (sponsorId, callback) => {
        db.query('SELECT * FROM sponsorships WHERE sponsor_id = ?', [sponsorId], callback);
    },

    create: (data, callback) => {
        const query = 'INSERT INTO sponsorships SET ?';
        db.query(query, data, callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE sponsorships SET ? WHERE id = ?';
        db.query(query, [data, id], callback);
    },

    softDelete: (id, callback) => {
        const query = `
            UPDATE sponsorships 
            SET orphan_status = 'Not Available', sponsor_status = 'Not Available' 
            WHERE id = ?
        `;
        db.query(query, [id], callback);
    }
};

module.exports = Sponsorship;
