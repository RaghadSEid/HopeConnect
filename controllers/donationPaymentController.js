const DonationPayment = require('../models/donationPaymentModel');

exports.getAllPayments = (req, res) => {
    DonationPayment.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getPaymentById = (req, res) => {
    const id = req.params.id;
    DonationPayment.getById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(404).json({ message: 'Payment not found' });
        res.json(result[0]);
    });
};

exports.createPayment = (req, res) => {
    DonationPayment.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Payment created', id: result.insertId });
    });
};



exports.deletePayment = (req, res) => {
    const id = req.params.id;
    DonationPayment.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Payment deleted' });
    });
};

exports.getSummary = (req, res) => {
    DonationPayment.getSummary((err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};


exports.updateTransactionFeePercent = (req, res) => {
    const newPercent = req.body.transaction_fee_percent;

    if (typeof newPercent !== 'number' || newPercent < 0 || newPercent > 1) {
        return res.status(400).json({ error: 'Invalid transaction_fee_percent. It must be a number between 0 and 1.' });
    }

    DonationPayment.updateTransactionFeePercent(newPercent, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Transaction fee percent updated for all records' });
    });
};
