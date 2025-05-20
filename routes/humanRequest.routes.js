const express = require('express');
const router = express.Router();
const humanRequestController = require('../controllers/humanRequest.controller');

router.post('/orphanages/:orphanage_id', humanRequestController.createRequest);
router.get('/', humanRequestController.getAllRequests);

module.exports = router;
