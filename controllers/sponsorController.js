const Sponsor = require('../models/sponsor');

exports.getAllSponsors = (req, res) => {
    Sponsor.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createSponsor = (req, res) => {
    Sponsor.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Sponsor created successfully', id: result.insertId });
    });
};

exports.updateSponsor = (req, res) => {
    const id = req.params.id;
    Sponsor.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Sponsor updated successfully' });
    });
};

exports.deleteSponsor = (req, res) => {
    const id = req.params.id;
    Sponsor.softDelete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Sponsor marked as Not Available and updates logged successfully' });
    });
};
