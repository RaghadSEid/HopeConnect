// routes/deliveryTrackingRoutes.js
const express = require('express');
const router = express.Router();
const deliveryTrackingController = require('../controllers/deliveryTrackingController');

// POST /api/delivery-tracking/assign
router.post('/assign', deliveryTrackingController.assignDelivery);
router.post('/confirm', deliveryTrackingController.confirmDelivery);

module.exports = router;
