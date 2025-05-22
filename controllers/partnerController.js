const Partner = require('../models/partnerModel');

exports.getAllPartners = (req, res) => {
    Partner.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getPartnerById = (req, res) => {
    const id = req.params.id;
    Partner.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Partner not found' });
        res.json(results[0]);
    });
};

exports.createPartner = (req, res) => {
    Partner.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Partner created', id: result.insertId });
    });
};

exports.updatePartner = (req, res) => {
    const id = req.params.id;
    Partner.update(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Partner updated' });
    });
};

exports.deletePartner = (req, res) => {
    const id = req.params.id;
    Partner.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Partner deleted' });
    });
};
