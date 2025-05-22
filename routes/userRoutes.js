const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/role/:role', userController.getUsersByRole);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.softDeleteUser);
module.exports = router;
