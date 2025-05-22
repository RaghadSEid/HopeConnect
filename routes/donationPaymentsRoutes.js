const express = require('express');
const router = express.Router();
const controller = require('../controllers/donationPaymentController');

router.get('/', controller.getAllPayments);
router.get('/summary', controller.getSummary);
router.get('/:id', controller.getPaymentById);
router.post('/', controller.createPayment);
router.delete('/:id', controller.deletePayment);
router.put('/update-fee-percent', controller.updateTransactionFeePercent);

module.exports = router;
