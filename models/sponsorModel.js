const db = require('../config/db');

const Sponsor = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = `
  SELECT s.id, s.sponsorship_type, u.name, u.email, u.phone, u.location
  FROM sponsors s
  JOIN users u ON s.user_id = u.user_id
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
        SELECT s.*, u.name AS user_name, u.email, u.phone, u.location ,u.status
        FROM sponsors s
        JOIN users u ON s.user_id = u.user_id
        WHERE s.id = ?
      `;
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    },


    update: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE sponsors SET ? WHERE id = ?', [data, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

  
};

module.exports = Sponsor;
