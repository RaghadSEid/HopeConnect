const db = require('../config/db');

const Payment = {
    getAll: (callback) => {
        const query = 'SELECT * FROM payment_transactions';
        db.query(query, callback);
    },

   

    add: (paymentData, callback) => {
        const query = `
            INSERT INTO payment_transactions 
            (payer_id, payment_method, transaction_id, status, paid_amount, paid_at, payer_type)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            paymentData.payer_id,
            paymentData.payment_method,
            paymentData.transaction_id,
            paymentData.status,
            paymentData.paid_amount,
            paymentData.paid_at,
            paymentData.payer_type
        ];
        db.query(query, values, callback);
    },

    update: (id, updatedData, callback) => {
        const query = 'UPDATE payment_transactions SET ? WHERE id = ?';
        db.query(query, [updatedData, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM payment_transactions WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Payment;
