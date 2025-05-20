// controllers/donationController.js
const Donation = require('../models/donationModel.js');

// POST /api/donations
exports.createDonation = async (req, res) => {
    try {
        const donationData = req.body;
        const result = await Donation.createDonation(donationData);
        res.status(201).json({
            message: 'Donation created successfully!',
            donationId: result.insertId
        });
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /api/donations
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.getAllDonations();
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllDonations = async (req, res) => {
    try {
        const { category } = req.query;

        if (category) {
            const donations = await Donation.getDonationsByCategory(category);
            return res.status(200).json(donations);
        }

        const donations = await Donation.getAllDonations();
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllDonations = async (req, res) => {
    try {
        const { category, donor_id } = req.query;

        if (category) {
            const donations = await Donation.getDonationsByCategory(category);
            return res.status(200).json(donations);
        }

        if (donor_id) {
            const donations = await Donation.getDonationsByDonor(donor_id);
            return res.status(200).json(donations);
        }

        const donations = await Donation.getAllDonations();
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateDonationFields = async (req, res) => {
    const donation_id = req.params.donation_id;
    const updateFields = req.body;

    try {
        // تحديث التبرع
        await Donation.updateDonationFields(donation_id, updateFields);

        // إذا فيه impact_description تم إرساله ضمن الـ body
        if (updateFields.impact_description && updateFields.impact_description.trim() !== "") {
            // جيب user_id المرتبط بالتبرع
            const user_id = await Donation.getUserIdByDonationId(donation_id);

            if (user_id) {
                const message = `Your donation has been disbursed in : ${updateFields.impact_description} please inter your feedback ^_^`;
                await Donation.createNotification(user_id, message);
            }
        }

        res.status(200).json({ message: 'Donation updated successfully.' });
    } catch (err) {
        console.error("Error updating donation:", err);
        res.status(500).json({ message: 'Error updating donation', error: err });
    }
};


exports.getDonationsNoImpact = async (req, res) => {
    try {
        const donations = await Donation.getDonationsNoImpact();
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations with null impact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


