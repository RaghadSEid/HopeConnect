const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// GET /api/notifications
router.get('/', notificationController.getAllNotifications);
router.get('/:donor_id', notificationController.getNotificationsByDonor);

module.exports = router;
