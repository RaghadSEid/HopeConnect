const Donation = require('../models/donation');

const donationController = {

    getAllDonations: (req, res) => {
        Donation.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    getDonationById: (req, res) => {
        const id = req.params.id;
        Donation.getById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Donation not found' });
            res.json(results[0]);
        });
    },

    createDonation: (req, res) => {
        const data = req.body;
        Donation.create(data, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Donation created', donationId: result.insertId });
        });
    },

    updateDonation: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        Donation.update(id, data, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Donation not found' });
            res.json({ message: 'Donation updated' });
        });
    },


};

module.exports = donationController;
