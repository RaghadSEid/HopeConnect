const MatchModel = require('../models/match.model');
const HumanRequest = require('../models/humanRequest.model');
const notification = require('../models/notificationModel');

exports.updateRequestStatusAndNotify = (req, res) => {
    const request_id = req.params.request_id;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    HumanRequest.updateRequestStatus(request_id, status, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update request status' });

        if (status === 'accepted') {
            MatchModel.findVolunteersByRequest2(request_id, (err2, volunteers) => {
                if (err2) return res.status(500).json({ error: 'Failed to fetch volunteers' });

                if (volunteers.length === 0) {
                    return res.status(200).json({ message: 'There is no request with this ID.' });
                }

                const notifyPromises = volunteers.map(v => {
                    const message = `📢 A new help request matches your skills. Please check request #${request_id}, and if you can help, please accept it.`;
                    return new Promise((resolve, reject) => {
                        notification.notifyVolunteer(v.volunteer_id, message, (notifErr) => {
                            if (notifErr) reject(notifErr);
                            else resolve();
                        });
                    });
                });

                Promise.all(notifyPromises)
                    .then(() => {
                        res.status(200).json({ message: 'Request accepted and volunteers notified.' });
                    })
                    .catch(() => {
                        res.status(500).json({ message: 'Request accepted but failed to notify some volunteers.' });
                    });
            });
        } else {
            res.status(200).json({ message: 'Request status updated.' });
        }
    });
};

exports.getMatchingVolunteers = (req, res) => {
    const request_id = req.params.request_id;

    MatchModel.findVolunteersByRequest(request_id, (err, results) => {
        if (err) {
            console.error('Error fetching matches:', err.message);
            return res.status(500).json({ error: 'Failed to find matching volunteers' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No matching volunteers found' });
        }

        res.status(200).json(results);
    });
};

exports.volunteerRespondToRequest = (req, res) => {
    const {request_id } = req.params;
    const status = req.body.status || req.body.response;  

    if (!['confirmed', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Use confirmed or rejected.' });
    }

    const message = status === 'confirmed'
        ? `✅ Volunteer  has accepted request #${request_id}.`
        : `❌ Volunteer  has rejected request #${request_id}.`;

    MatchModel.getOrphanageByRequestId(request_id, (err, orphanage) => {
        if (err || !orphanage) {
            return res.status(500).json({ error: 'Failed to fetch orphanage information.' });
        }

        const orphanage_id = orphanage.orphanage_id; 


        notification.notifyOrphanage(orphanage.orphanage_id, message, (notifErr) => {
            if (notifErr) {
                console.error('Notification error:', notifErr);
            }

            if (status === 'confirmed') {
                HumanRequest.updateRequestStatus(request_id, 'confirmed', (updateErr) => {
                    if (updateErr) {
                        return res.status(500).json({ error: 'Failed to confirm request' });
                    }

                    return res.status(200).json({ message: 'Volunteer accepted and orphanage notified. Status updated to confirmed.' });
                });
            } else {
                return res.status(200).json({ message: 'Volunteer rejected and orphanage notified.' });
            }
        });
    });
};
