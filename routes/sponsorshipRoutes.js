const express = require('express');
const router = express.Router();
const sponsorshipController = require('../controllers/sponsorshipController');

router.get('/', sponsorshipController.getAllSponsorships);

router.get('/orphan/:orphanId', sponsorshipController.getSponsorshipByOrphan);

router.get('/sponsor/:sponsorId', sponsorshipController.getSponsorshipBySponsor);

router.post('/', sponsorshipController.createSponsorship);

router.put('/:id', sponsorshipController.updateSponsorship);

router.delete('/:id', sponsorshipController.softDeleteSponsorship);

module.exports = router;
