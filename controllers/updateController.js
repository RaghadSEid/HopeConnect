const OrphanUpdate = require('../models/orphanUpdate');

const BASE_URL = 'http://localhost:3000';

exports.getAllUpdates = (req, res) => {
    OrphanUpdate.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        const updates = results.map(update => {
            if (update.image_url) {
                update.image_url = BASE_URL + update.image_url;
            }
            return update;
        });
        res.json(updates);
    });
};

exports.getUpdatesByOrphan = (req, res) => {
    const orphanId = req.params.orphanId;
    OrphanUpdate.getByOrphanId(orphanId, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        const updates = results.map(update => {
            if (update.image_url) {
                update.image_url = BASE_URL + update.image_url;
            }
            return update;
        });
        res.json(updates);
    });
};

exports.createUpdate = (req, res) => {
    const data = req.body;

    // تأكد إن created_at موجودة وإلا حط التاريخ الحالي
    if (!data.created_at) data.created_at = new Date();

    OrphanUpdate.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Update created', id: result.insertId });
    });
};

exports.updateUpdate = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    OrphanUpdate.update(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Update modified' });
    });
};

exports.deleteUpdate = (req, res) => {
    const id = req.params.id;
    OrphanUpdate.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Update deleted' });
    });
};
