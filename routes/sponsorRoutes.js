const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');
const verifyToken = require('../middlewares/verifyToken');
const checkPermission = require('../middlewares/checkPermission');



router.post(
    '/external/export-sheet',
    verifyToken,
    checkPermission('canViewSponsors'),
    sponsorController.exportSponsorsToGoogleSheet
);

router.post(
    '/external/post-by-id/:id',
    verifyToken,
    checkPermission('canViewSponsors'),
    sponsorController.postSponsorByIdToExternalAPI
);

router.get('/', sponsorController.getAllSponsors);
router.get('/:id', sponsorController.getSponsorById);
router.put('/:id', sponsorController.updateSponsor);




module.exports = router;
