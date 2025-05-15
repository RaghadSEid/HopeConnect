const express = require('express');
const router = express.Router();
const orphanController = require('../controllers/orphanController');

router.get('/', orphanController.getAllOrphans);       
router.post('/', orphanController.addOrphan);          
router.put('/:id', orphanController.updateOrphan);     
router.delete('/:id', orphanController.deleteOrphan);  

module.exports = router;
