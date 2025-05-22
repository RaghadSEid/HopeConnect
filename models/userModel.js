const db = require('../config/db');

const User = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users SET ?';
            db.query(query, data, (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
        });
    },

    insertToRoleTable: (role, userId) => {
        return new Promise((resolve, reject) => {
            let roleTable = '';
            switch (role) {
                case 'sponsor':
                    roleTable = 'sponsors';
                    break;
                case 'donor':
                    roleTable = 'donors';
                    break;
                case 'volunteer':
                    roleTable = 'volunteers';
                    break;
                case 'delivery':
                    roleTable = 'delivery';
                    break;
                case 'orphanages':
                    roleTable = 'orphanages';
                    break;
                default:
                    return reject(new Error('Invalid role'));
            }

            const query = `INSERT INTO ${roleTable} (user_id) VALUES (?)`;
            db.query(query, [userId], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
        });
    },


        getAllUsers: () => {
            return new Promise((resolve, reject) => {
                const query = `
        SELECT user_id, name, email, phone, location, role, status, created_at
        FROM users
      `;
                db.query(query, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
        },

    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT user_id, name, email, phone, location, role, status, created_at
            FROM users
            WHERE user_id = ?
        `;
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); 
            });
        });
    },

    getUsersByRole: (role) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT user_id, name, email, phone, location, role, status, created_at
            FROM users
            WHERE role = ?
        `;
            db.query(query, [role], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    update: (id, data) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET ? WHERE user_id = ?';
            db.query(query, [data, id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    softDelete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET status = ? WHERE user_id = ?';
            db.query(query, ['Suspended', id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },


};



module.exports = User;
