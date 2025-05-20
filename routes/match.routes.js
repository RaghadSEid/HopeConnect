const express = require('express');
const router = express.Router();
const controller = require('../controllers/match.controller');

// Get volunteers who match a specific request
router.get('/:request_id', controller.getMatchingVolunteers);
router.put('/orphanagesupdate/:request_id', controller.updateRequestStatusAndNotify);
router.put('/volunteersupdate/:request_id', controller.volunteerRespondToRequest);

module.exports = router;
