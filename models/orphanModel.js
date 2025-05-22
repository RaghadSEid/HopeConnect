const db = require('../config/db');

const Orphan = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = `
  SELECT o.*, u.name AS orphanage_name
  FROM orphans o
  JOIN orphanages og ON o.orphanage_id = og.orphanage_id
  JOIN users u ON og.user_id = u.user_id
`;
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
  SELECT o.*, u.name AS orphanage_name
  FROM orphans o
  JOIN orphanages og ON o.orphanage_id = og.orphanage_id
  JOIN users u ON og.user_id = u.user_id
  WHERE o.id = ?
`;

            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO orphans SET ?', data, (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
        });
    },

    update: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE orphans SET ? WHERE id = ?', [data, id], (err, result) => {
                if (err) return reject(err);

                const updateQuery = `
                INSERT INTO orphan_updates (orphan_id, update_type, description, created_at)
                VALUES (?, ?, ?, NOW())
            `;

                const updateType = 'profile_update'; 
                const description = `Orphan profile updated: ${Object.keys(data).join(', ')}`;

                db.query(updateQuery, [id, updateType, description], (err2) => {
                    if (err2) return reject(err2);
                    resolve(result);
                });
            });
        });
    },


    softDelete: (id) => {
        return new Promise((resolve, reject) => {
            const orphanStatusQuery = 'SELECT status FROM orphans WHERE id = ?';

            // ✅ استعلام جديد يجلب user_id بدلاً من sponsor_id
            const sponsorshipQuery = `
            SELECT DISTINCT s.user_id
            FROM sponsorships sp
            JOIN sponsors s ON sp.sponsor_id = s.id
            WHERE sp.orphan_id = ?
        `;

            const updateSponsorshipStatusQuery = 'UPDATE sponsorships SET status = "Not Available" WHERE orphan_id = ?';
            const insertUpdateQuery = `
            INSERT INTO orphan_updates (orphan_id, update_type, description)
            VALUES (?, 'status_change', 'This orphan is no longer available.')
        `;
            const updateOrphanStatusQuery = 'UPDATE orphans SET status = "Not Available" WHERE id = ?';
            const insertNotificationsQuery = 'INSERT INTO notifications (user_id, message, created_at) VALUES ?';

            const getOrphanNameQuery = 'SELECT name FROM orphans WHERE id = ?';

            db.query(orphanStatusQuery, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) {
                    return reject(new Error('Orphan not found'));
                }

                if (results[0].status === 'Not Available') {
                    return reject(new Error('This orphan is already marked as Not Available.'));
                }

                db.query(getOrphanNameQuery, [id], (errName, nameResults) => {
                    if (errName) return reject(errName);
                    const orphanName = nameResults[0]?.name || `ID: ${id}`;

                    db.query(sponsorshipQuery, [id], (err, sponsorshipResults) => {
                        if (err) return reject(err);

                        const uniqueUserIds = [...new Set(sponsorshipResults.map(row => row.user_id))];
                        const notifications = [];
                        const notificationValues = [];

                        if (uniqueUserIds.length > 0) {
                            const message = `The orphan (${orphanName}) you were sponsoring is no longer available.`;
                            const createdAt = new Date();

                            for (const userId of uniqueUserIds) {
                                notifications.push(`Notification sent to sponsor with user_id = ${userId}`);
                                notificationValues.push([userId, message, createdAt]);
                            }
                        }

                        db.query(updateOrphanStatusQuery, [id], (err0) => {
                            if (err0) return reject(err0);

                            db.query(updateSponsorshipStatusQuery, [id], (err2) => {
                                if (err2) return reject(err2);

                                db.query(insertUpdateQuery, [id], (err3) => {
                                    if (err3) return reject(err3);

                                    if (notificationValues.length > 0) {
                                        db.query(insertNotificationsQuery, [notificationValues], (err4) => {
                                            if (err4) return reject(err4);
                                            return resolve(notifications);
                                        });
                                    } else {
                                        return resolve(['No sponsors to notify.']);
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    }




};

module.exports = Orphan;
