const db = require('../config/db');

const Orphan = {
    getAll: (callback) => {
        db.query('SELECT * FROM orphans', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM orphans WHERE id = ?', [id], callback);
    },

    create: (data, callback) => {
        const { name, age, education_status, health_condition } = data;
        db.query(
            'INSERT INTO orphans (name, age, education_status, health_condition, status) VALUES (?, ?, ?, ?, "Available")',
            [name, age, education_status, health_condition],
            callback
        );
    },

    update: (id, data, callback) => {
        const { name, age, education_status, health_condition, status } = data;
        db.query(
            'UPDATE orphans SET name = ?, age = ?, education_status = ?, health_condition = ?, status = ? WHERE id = ?',
            [name, age, education_status, health_condition, status, id],
            callback
        );
    },

    softDelete: (id, callback) => {
        db.beginTransaction(err => {
            if (err) return callback(err);

            db.query('UPDATE orphans SET status = "Not Available" WHERE id = ?', [id], (err, result) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                db.query('UPDATE sponsorships SET orphan_status = "Not Available" WHERE orphan_id = ?', [id], (err, result) => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }

                    const description = "This orphan is no longer available.";
                    const now = new Date();
                    db.query(
                        'INSERT INTO orphan_updates (orphan_id, update_type, description, image_url, created_at) VALUES (?, ?, ?, ?, ?)',
                        [id, 'status_change', description, null, now],
                        (err, result) => {
                            if (err) {
                                return db.rollback(() => callback(err));
                            }

                            db.commit(err => {
                                if (err) {
                                    return db.rollback(() => callback(err));
                                }
                                callback(null, result);
                            });
                        }
                    );
                });
            });
        });
    }
};

module.exports = Orphan;
