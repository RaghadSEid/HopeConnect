﻿const db = require('../config/db');

exports.insertSkill = (name, callback) => {
	const sql = 'INSERT INTO skills (name) VALUES (?)';
	db.query(sql, [name], callback);
};

exports.getAllSkills = (callback) => {
	const sql = 'SELECT * FROM skills';
	db.query(sql, callback);
};

exports.updateAvailability = (volunteer_id, availability, callback) => {
	const sql = 'UPDATE volunteers SET availability = ? WHERE volunteer_id = ?';
	db.query(sql, [availability, volunteer_id], callback);
};

exports.addSkillsToVolunteer = (volunteer_id, skill_ids, callback) => {
	const values = skill_ids.map(skill_id => [volunteer_id, skill_id]);
	const sql = 'INSERT IGNORE INTO volunteer_skills (volunteer_id, skill_id) VALUES ?';
	db.query(sql, [values], callback);
};

