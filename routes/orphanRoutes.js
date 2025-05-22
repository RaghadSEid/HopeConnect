const express = require('express');
const router = express.Router();
const orphanController = require('../controllers/orphanController');

router.get('/', orphanController.getAllOrphans);
router.get('/:id', orphanController.getOrphanById);
router.post('/', orphanController.createOrphan);
router.put('/:id', orphanController.updateOrphan);
router.delete('/:id', orphanController.softDeleteOrphan);

module.exports = router;
