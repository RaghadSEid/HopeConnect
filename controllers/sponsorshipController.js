const Sponsorship = require('../models/sponsorshipModel');
const db = require('../config/db');


exports.getAllSponsorships = async (req, res) => {
    try {
        const results = await Sponsorship.getAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getByOrphanId = async (req, res) => {
    try {
        const results = await Sponsorship.getByOrphanId(req.params.orphanId);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBySponsorId = async (req, res) => {
    try {
        const results = await Sponsorship.getBySponsorId(req.params.sponsorId);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSponsorship = async (req, res) => {
    try {
        const insertedId = await Sponsorship.create(req.body);
        res.status(201).json({ id: insertedId, message: 'Your request is pending approval' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSponsorship = async (req, res) => {
    try {
        await Sponsorship.update(req.params.id, req.body);
        res.json({ message: 'Sponsorship updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

function queryPromise(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

exports.updateSponsorshipStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const id = req.params.id;

        // تحديث الحالة
        await Sponsorship.updateStatus(id, status);

        // جلب بيانات ال sponsorship مع اسم ال orphan و user_id للسبونسر
        const query = `
            SELECT s.sponsor_id, o.name AS orphan_name, u.user_id
            FROM sponsorships s
            JOIN orphans o ON s.orphan_id = o.id
            JOIN sponsors sp ON s.sponsor_id = sp.id
            JOIN users u ON sp.user_id = u.user_id
            WHERE s.id = ?
        `;

        const rows = await queryPromise(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Sponsorship not found' });
        }

        const sponsorUserId = rows[0].user_id;
        const orphanName = rows[0].orphan_name;

        // رسالة النوتيفيكيشن
        let message = '';
        if (status === 'Available') {
            message = `Your sponsorship request for ${orphanName} has been approved.`;
        } else if (status === 'Pending Approval') {
            message = `Your sponsorship request for ${orphanName} is pending approval.`;
        } else if (status === 'Rejected') {
            message = `Your sponsorship request for ${orphanName} has been rejected.`;
        } else {
            message = `Status of your sponsorship request for ${orphanName} has been updated to ${status}.`;
        }

        const insertNotificationQuery = `
            INSERT INTO notifications (user_id, message, created_at)
            VALUES (?, ?, NOW())
        `;

        await queryPromise(insertNotificationQuery, [sponsorUserId, message]);

        res.json({ message: 'Sponsorship status updated and notification sent successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.softDeleteSponsorship = async (req, res) => {
    try {
        await Sponsorship.softDelete(req.params.id);
        res.json({ message: 'Sponsorship marked as Not Available' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
