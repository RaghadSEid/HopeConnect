const express = require('express');
const router = express.Router();
const sponsorshipController = require('../controllers/sponsorshipController');

router.get('/', sponsorshipController.getAllSponsorships);
router.get('/orphan/:orphanId', sponsorshipController.getByOrphanId);
router.get('/sponsor/:sponsorId', sponsorshipController.getBySponsorId);
router.post('/', sponsorshipController.createSponsorship);
router.put('/:id', sponsorshipController.updateSponsorship);
router.put('/:id/status', sponsorshipController.updateSponsorshipStatus);
router.delete('/:id', sponsorshipController.softDeleteSponsorship);

module.exports = router;
