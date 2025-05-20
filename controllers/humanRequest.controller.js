const HumanRequest = require('../models/humanRequest.model');
const MatchModel = require('../models/match.model');

exports.getAllRequests = (req, res) => {
    HumanRequest.getAllRequests((err, results) => {
        if (err) {
            console.error('Error fetching requests:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve requests' });
        }

        res.status(200).json(results);
    });
};


exports.createRequest = (req, res) => {
    const orphanage_id = req.params.orphanage_id;
    const { description, is_emergency, skill_id } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'Description is required' });
    }

    HumanRequest.insertRequest({ orphanage_id, description, is_emergency, skill_id }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        const request_id = result.insertId;

        MatchModel.findVolunteersByRequest(request_id, (err2, volunteers) => {
            if (err2) return res.status(500).json({ message: 'Matching failed' });

            if (volunteers.length === 0) {
                return res.status(201).json({
                    message: 'Request created ✅ but no matching volunteers found.',
                    request_id
                });
            }

            const values = volunteers.map(v => [v.volunteer_id, request_id]);

            MatchModel.insertVolunteerMatches(values, (err3) => {
                if (err3) return res.status(500).json({ message: 'Matched, but insert failed' });

                const notifyMessage = ` Fortunately, ${volunteers.length} volunteers have been found for your request, go and check. ^_^`;

                MatchModel.notifyOrphanage(orphanage_id, notifyMessage, (notifErr) => {
                    if (notifErr) {
                        return res.status(500).json({ message: 'Matched, but notification failed' });
                    }

                    res.status(201).json({
                        message: 'Request created ✅, volunteers matched, and orphanage notified.',
                        request_id,
                        matched_volunteers: volunteers
                    });
                });
            });
        });
    });
};



