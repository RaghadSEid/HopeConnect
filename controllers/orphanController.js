const Orphan = require('../models/orphanModel');
const db = require('../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);

exports.getAllOrphans = async (req, res) => {
    try {
        const orphans = await Orphan.getAll();
        res.json(orphans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrphanById = async (req, res) => {
    try {
        const orphan = await Orphan.getById(req.params.id);
        if (!orphan) return res.status(404).json({ message: 'Orphan not found' });
        res.json(orphan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createOrphan = async (req, res) => {
    try {
        const newOrphan = req.body;

        const insertedId = await Orphan.create(newOrphan);

        const sponsors = await query("SELECT user_id FROM users WHERE role = 'sponsor'");

        const message = 'A new orphan has been added. If you like to sponsor them';

        for (const sponsor of sponsors) {
            await query(
                'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
                [sponsor.user_id, message]
            );
        }

        res.status(201).json({ id: insertedId, message: 'Orphan created successfully and notifications sent to sponsors.' });
    } catch (err) {
        console.error('Error creating orphan and sending notifications:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrphan = async (req, res) => {
    try {
        await Orphan.update(req.params.id, req.body);
        res.json({ message: 'Orphan updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.softDeleteOrphan = async (req, res) => {
    try {
        const notifications = await Orphan.softDelete(req.params.id);
        res.json({
            message: 'Orphan marked as Not Available',
            notifications: notifications
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

