const SkillModel = require('../models/skill.model');

exports.createSkill = (req, res) => {
	const { name } = req.body;
	if (!name) return res.status(400).json({ error: 'Skill name is required' });

	SkillModel.insertSkill(name, (err, result) => {
		if (err) return res.status(500).json({ error: 'Failed to add skill' });
		res.status(201).json({ message: 'Skill added', skill_id: result.insertId, name });
	});
};

exports.getAllSkills = (req, res) => {
	SkillModel.getAllSkills((err, results) => {
		if (err) return res.status(500).json({ error: 'Failed to retrieve skills' });
		res.status(200).json(results);
	});
};

exports.addSkills = (req, res) => {
	const volunteer_id = req.params.volunteer_id;
	const { skill_ids, availability } = req.body;

	if (!Array.isArray(skill_ids) || skill_ids.length === 0) {
		return res.status(400).json({ error: 'skill_ids must be a non-empty array' });
	}

	const finish = () => {
		SkillModel.addSkillsToVolunteer(volunteer_id, skill_ids, (err2, result) => {
			if (err2) {
				console.error('Error adding skills:', err2.message);
				return res.status(500).json({ error: 'Failed to assign skills' });
			}

			res.status(201).json({
				message: 'Skills and availability saved successfully',
				addedCount: result.affectedRows
			});
		});
	};

	if (availability) {
		SkillModel.updateAvailability(volunteer_id, availability, (err) => {
			if (err) {
				console.error('Error updating availability:', err.message);
				return res.status(500).json({ error: 'Failed to update availability' });
			}
			finish();
		});
	} else {
		finish();
	}
};

