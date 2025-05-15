const Orphan = require('../models/orphan');

exports.getAllOrphans = (req, res) => {
    Orphan.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addOrphan = (req, res) => {
    Orphan.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'تمت إضافة اليتيم بنجاح', id: result.insertId });
    });
};

exports.updateOrphan = (req, res) => {
    const id = req.params.id;
    Orphan.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'تم تعديل بيانات اليتيم' });
    });
};

exports.deleteOrphan = (req, res) => {
    const id = req.params.id;
    Orphan.softDelete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Orphan status changed to Not Available and updates logged successfully' });
    });
};

