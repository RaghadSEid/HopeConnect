
const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController.js');

// GET /api/donations
router.get('/', volunteerController.getAllVolunteers);

module.exports = router;


