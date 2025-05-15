const Sponsorship = require('../models/sponsorship');

exports.getAllSponsorships = (req, res) => {
    Sponsorship.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getSponsorshipByOrphan = (req, res) => {
    const { orphanId } = req.params;
    Sponsorship.getByOrphanId(orphanId, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getSponsorshipBySponsor = (req, res) => {
    const { sponsorId } = req.params;
    Sponsorship.getBySponsorId(sponsorId, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.createSponsorship = (req, res) => {
    const data = req.body;
    Sponsorship.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Sponsorship created', id: result.insertId });
    });
};

exports.updateSponsorship = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Sponsorship.update(id, data, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Sponsorship updated' });
    });
};

exports.softDeleteSponsorship = (req, res) => {
    const { id } = req.params;
    Sponsorship.softDelete(id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Sponsorship marked as Not Available' });
    });
};
