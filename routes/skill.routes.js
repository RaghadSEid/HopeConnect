const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');

// مهارات عامة
router.post('/', skillController.createSkill);  // إضافة مهارة
router.get('/', skillController.getAllSkills);  // عرض كل المهارات

// مهارات متطوع
router.post('/:volunteer_id', skillController.addSkills); // إضافة عدة مهارات + availability

module.exports = router;
