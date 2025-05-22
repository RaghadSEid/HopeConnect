const Notification = require('../models/notificationModel');

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.getAllNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getNotificationsByDonor = async (req, res) => {
    try {
        const donor_id = req.params.donor_id;
        const notifications = await Notification.getNotificationsByDonorId(donor_id);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications for donor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.sendEmergencyNotificationsToAllUsers = async (req, res) => {
    try {
        const result = await Notification.sendEmergencyNotificationsToAllUsers();
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error sending emergency notifications:', error);
        res.status(500).json({ message: 'Failed to send emergency notifications' });
    }
};
