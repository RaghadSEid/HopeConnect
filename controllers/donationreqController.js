const LogisticReq = require('../models/donationreqModel');
const Notification = require('../models/notificationModel'); 

exports.getAllLogisticReq = async (req, res) => {
    try {
        const LogisticReqs = await LogisticReq.getAllLogisticReq();
        res.status(200).json(LogisticReqs);
    } catch (error) {
        console.error('Error fetching LogisticReqs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createLogisticReq = async (req, res) => {
    try {
        const newReqData = req.body;
        const result = await LogisticReq.createLogisticReq(newReqData);

        // إذا الطلب طارئ، أرسل إشعارات
        if (newReqData.is_emergency === true || newReqData.is_emergency === 'true') {
            await Notification.sendEmergencyNotificationsToAllUsers();
        }

        res.status(201).json({
            message: 'Logistic request created successfully',
            id: result.insertId
        });

    } catch (error) {
        console.error('Error creating LogisticReq:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
