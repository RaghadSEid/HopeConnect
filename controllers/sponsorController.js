const Sponsor = require('../models/sponsorModel');
const { exportSponsors } = require('../Apis/exportSponsorsToSheet');
const axios = require('axios');


exports.getAllSponsors = async (req, res) => {
    try {
        const sponsors = await Sponsor.getAll();
        res.json(sponsors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSponsorById = async (req, res) => {
    try {
        const sponsor = await Sponsor.getById(req.params.id);
        if (!sponsor) return res.status(404).json({ message: 'Sponsor not found' });
        res.json(sponsor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.updateSponsor = async (req, res) => {
    try {
        await Sponsor.update(req.params.id, req.body);
        res.json({ message: 'Sponsor updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.exportSponsorsToGoogleSheet = async (req, res) => {
    try {
        const result = await exportSponsors(); 

        if (result.success) {
            res.status(200).json({ message: "Sponsors exported successfully", count: result.count });
        } else {
            res.status(500).json({ message: "Export failed", error: result.error });
        }
    } catch (err) {
        res.status(500).json({ message: "Export failed", error: err.message });
    }


};

exports.postSponsorByIdToExternalAPI = async (req, res) => {
    try {
        const sponsor = await Sponsor.getById(req.params.id);

        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor not found' });
        }


        const externalApiUrl = 'https://script.google.com/macros/s/AKfycbyabSlYrD9fHhDMXUiAmoQTHOe72mgzdbMN2Ni0veodS8knX4FD5VEV9to1D7EhPke3uQ/exec';


        const response = await axios.post(externalApiUrl, sponsor);

        res.status(200).json({
            message: 'Sponsor data posted successfully to external API',
            externalResponse: response.data
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to post sponsor to external API', error: err.message });
    }
};
