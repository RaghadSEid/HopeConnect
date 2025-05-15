const Payment = require('../models/payment');

exports.getAllPayments = (req, res) => {
    Payment.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.addPayment = (req, res) => {
    const paymentData = req.body;
    Payment.add(paymentData, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Payment added successfully', id: result.insertId });
    });
};

exports.updatePayment = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    Payment.update(id, updatedData, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Payment updated successfully' });
    });
};

exports.deletePayment = (req, res) => {
    const { id } = req.params;
    Payment.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Payment deleted successfully' });
    });
};
