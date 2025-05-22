const db = require('../config/db');

exports.getAllVolunteers = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT v.volunteer_id, v.availability, v.user_id,
                   s.skill_id, s.name AS skill_name
            FROM volunteers v
            LEFT JOIN volunteer_skills vs ON v.volunteer_id = vs.volunteer_id
            LEFT JOIN skills s ON vs.skill_id = s.skill_id
            ORDER BY v.volunteer_id ASC
        `;
        db.query(sql, (err, results) => {
            if (err) return reject(err);

            const volunteersMap = new Map();

            for (const row of results) {
                const vid = row.volunteer_id;
                if (!volunteersMap.has(vid)) {
                    volunteersMap.set(vid, {
                        volunteer_id: row.volunteer_id,
                        availability: row.availability,
                        user_id: row.user_id,
                        skills: []
                    });
                }

                if (row.skill_id) {
                    volunteersMap.get(vid).skills.push({
                        skill_id: row.skill_id,
                        name: row.skill_name
                    });
                }
            }

            resolve([...volunteersMap.values()]);
        });
    });
};
