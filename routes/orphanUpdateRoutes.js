const express = require('express');
const router = express.Router();
const controller = require('../controllers/orphanUpdateController');
const multer = require('multer');
const path = require('path');

// إعداد التخزين للصور
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');

    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

// المسارات
router.get('/', controller.getAllUpdates);
router.get('/:id', controller.getUpdatesByOrphan);
router.post('/', upload.single('image'), controller.createUpdate);
router.put('/:id', upload.single('image'), controller.updateUpdate);
router.delete('/:id', controller.deleteUpdate);

module.exports = router;
