// routes/donation.routes.js
const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController.js');

// POST /api/donations
router.post('/', donationController.createDonation);

// GET /api/donations
router.get('/', donationController.getAllDonations);


router.put('/:donation_id', donationController.updateDonationFields);

router.get('/NoImpact', donationController.getDonationsNoImpact);


module.exports = router;

