const volunteer = require('../models/volunteerModel.js');

exports.getAllVolunteers = async (req, res) => {
    try {
        const Volunteers = await volunteer.getAllVolunteers();
        res.status(200).json(Volunteers);
    } catch (error) {
        console.error('Error fetching Volunteers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


