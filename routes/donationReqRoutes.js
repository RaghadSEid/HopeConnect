const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/donationreqController');

// GET /api/notifications
router.get('/', logisticsController.getAllLogisticReq);
router.post('/', logisticsController.createLogisticReq);

module.exports = router;
