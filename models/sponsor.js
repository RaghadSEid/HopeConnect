const db = require('../config/db');

const Sponsor = {
    getAll: (callback) => {
        db.query('SELECT * FROM sponsors', callback);
    },

    create: (data, callback) => {
        const { name, email, phone, sponsorship_type } = data;
        const created_at = new Date();
        db.query(
            'INSERT INTO sponsors (name, email, phone, sponsorship_type, created_at, status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone, sponsorship_type, created_at, 'Available'],
            callback
        );
    },

    update: (id, data, callback) => {
        const { name, email, phone, sponsorship_type, status } = data;
        db.query(
            'UPDATE sponsors SET name = ?, email = ?, phone = ?, sponsorship_type = ?, status = ? WHERE id = ?',
            [name, email, phone, sponsorship_type, status, id],
            callback
        );
    },

    softDelete: (id, callback) => {
        db.beginTransaction(err => {
            if (err) return callback(err);

            // تحديث حالة الكفيل
            db.query('UPDATE sponsors SET status = "Not Available" WHERE id = ?', [id], (err) => {
                if (err) return db.rollback(() => callback(err));

                // تحديث حالة الكفيل في جدول sponsorships
                db.query('UPDATE sponsorships SET sponsor_status = "Not Available" WHERE sponsor_id = ?', [id], (err) => {
                    if (err) return db.rollback(() => callback(err));

                    // الآن نجيب الأيتام المرتبطين بهالكفيل
                    db.query('SELECT orphan_id FROM sponsorships WHERE sponsor_id = ?', [id], (err, results) => {
                        if (err) return db.rollback(() => callback(err));

                        const now = new Date();
                        const updates = results.map(row => [
                            row.orphan_id,
                            'sponsor_status_change',
                            'Sponsor is no longer available.',
                            null,
                            now
                        ]);

                        if (updates.length === 0) {
                            return db.commit(callback); // ما في أيتام
                        }

                        // إدخال التحديثات في orphan_updates
                        db.query(
                            'INSERT INTO orphan_updates (orphan_id, update_type, description, image_url, created_at) VALUES ?',
                            [updates],
                            (err) => {
                                if (err) return db.rollback(() => callback(err));
                                db.commit(callback);
                            }
                        );
                    });
                });
            });
        });
    }
};

module.exports = Sponsor;
