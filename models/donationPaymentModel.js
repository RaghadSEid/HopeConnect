const db = require('../config/db');

exports.getAll = (callback) => {
    db.query('SELECT * FROM donation_payments', callback);
};

exports.getById = (id, callback) => {
    db.query('SELECT * FROM donation_payments WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
    // نأخذ النسبة من data أو نعطيها قيمة افتراضية 2% مثلاً
    const feePercent = data.transaction_fee_percent ?? 0.02;
    const transaction_fee = data.paid_amount * feePercent;
    const net_amount = data.paid_amount - transaction_fee;

    const query = `
    INSERT INTO donation_payments 
    (donation_id, payment_method, transaction_id, status, paid_amount, transaction_fee, net_amount, paid_at, transaction_fee_percent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
        data.donation_id,
        data.payment_method,
        data.transaction_id,
        data.status,
        data.paid_amount,
        transaction_fee,
        net_amount,
        data.paid_at,
        feePercent
    ];

    db.query(query, params, callback);
};


exports.delete = (id, callback) => {
    db.query('DELETE FROM donation_payments WHERE id = ?', [id], callback);
};

exports.getSummary = (callback) => {
    const query = `
    SELECT
      COUNT(*) AS total_transactions,
      SUM(paid_amount) AS total_paid_amount,
      SUM(transaction_fee) AS total_transaction_fees,
      SUM(net_amount) AS total_net_amount
    FROM donation_payments
  `;
    db.query(query, callback);
};


exports.updateTransactionFeePercent = (newPercent, callback) => {
    const query = `
        UPDATE donation_payments
        SET 
            transaction_fee_percent = ?,
            transaction_fee = paid_amount * ?,
            net_amount = paid_amount - (paid_amount * ?)
    `;
    const params = [newPercent, newPercent, newPercent];
    db.query(query, params, callback);
};
