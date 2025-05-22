// controllers/deliveryTrackingController.js
const DeliveryTracking = require('../models/deliveryTrackingModel');

exports.assignDelivery = async (req, res) => {
    try {
        const { deliveryAgentId, taskId } = req.body;

        if (!deliveryAgentId || !taskId) {
            return res.status(400).json({ message: 'Missing deliveryAgentId or taskId' });
        }

        await DeliveryTracking.assignDeliveryAgent(deliveryAgentId, taskId);

        const orphanageUserId = await DeliveryTracking.getOrphanageUserIdByTaskId(taskId);
        if (orphanageUserId) {
            const message = `✅ A delivery agent has accepted to deliver your donation (Logistics Task #${taskId}).`;
            await DeliveryTracking.addNotification(orphanageUserId, message);
        }
        

        res.status(200).json({ message: 'Task assigned and orphanage notified.' });
    } catch (err) {
        console.error('Assign delivery error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.confirmDelivery = async (req, res) => {
    try {
        const { taskId } = req.body;

        if (!taskId) {
            return res.status(400).json({ message: 'Missing taskId' });
        }

        // تحديث حالة المهمة والسائق
        await DeliveryTracking.confirmDeliveryCompletion(taskId);

        // جلب user_id للمؤسسة المرتبطة
        const orphanageUserId = await DeliveryTracking.getOrphanageUserIdByTaskId(taskId);

        // إرسال إشعار للمؤسسة أنه التوصيل تم
        if (orphanageUserId) {
            const message = ` Your donation (Task #${taskId}) has been successfully delivered by the delivery agent.`;
            await DeliveryTracking.addNotification(orphanageUserId, message);
            console.log("✅ Notification sent to orphanage:", orphanageUserId);
        } else {
            console.warn("⚠️ No orphanage user found for task:", taskId);
        }

        res.status(200).json({ message: 'Delivery marked as completed, driver set to Active, and orphanage notified.' });

    } catch (err) {
        console.error('Confirm delivery error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
