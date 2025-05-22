const express = require('express');
const router = express.Router();
const controller = require('../controllers/partnerController');

router.get('/', controller.getAllPartners);
router.get('/:id', controller.getPartnerById);
router.post('/', controller.createPartner);
router.put('/:id', controller.updatePartner);
router.delete('/:id', controller.deletePartner);

module.exports = router;
