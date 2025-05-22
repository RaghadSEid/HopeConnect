const connection = require('../config/db');


// ربط المهمة بالسائق وتحديث حالته
exports.assignDeliveryAgent = (deliveryAgentId, taskId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE logistics_tasks SET delivery_id = ?, status = 'in_progress' WHERE id = ?`,
            [deliveryAgentId, taskId],
            (err) => {
                if (err) return reject(err);

                connection.query(
                    `UPDATE delivery SET status = 'Busy' WHERE id = ?`,
                    [deliveryAgentId],
                    (err2) => {
                        if (err2) return reject(err2);
                        resolve();
                    }
                );
            }
        );
    });
};

// جلب user_id للمؤسسة المرتبطة بالتبرع
exports.getOrphanageUserIdByTaskId = (taskId) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT u.user_id
            FROM logistics_tasks lt
            JOIN donations d ON lt.donation_id = d.donation_id
            JOIN orphanages o ON d.orphanage_id = o.orphanage_id
            JOIN users u ON o.user_id = u.user_id
            WHERE lt.id = ?
        `, [taskId], (err, results) => {
            if (err) return reject(err);
            resolve(results.length ? results[0].user_id : null);
        });
    });
};

// إضافة إشعار
exports.addNotification = (userId, message) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO notifications (user_id, message) VALUES (?, ?)`,
            [userId, message],
            (err, result) => {
                if (err) {
                    console.error("❌ Error adding notification:", err);  // أضف هذا
                    return reject(err);
                }
                console.log("✅ Notification added for user:", userId);  // أضف هذا
                resolve(result);
            }
        );
    });
};


// تأكيد وصول المهمة وتحديث الحالات
exports.confirmDeliveryCompletion = (taskId) => {
    return new Promise((resolve, reject) => {
        // أولاً نجيب ID السائق من المهمة
        connection.query(
            `SELECT delivery_id FROM logistics_tasks WHERE id = ?`,
            [taskId],
            (err, results) => {
                if (err) return reject(err);
                if (!results.length) return reject(new Error("Task not found"));

                const deliveryAgentId = results[0].delivery_id;

                // نحدّث حالة المهمة والسائق معًا
                connection.query(
                    `UPDATE logistics_tasks SET status = 'completed' WHERE id = ?`,
                    [taskId],
                    (err2) => {
                        if (err2) return reject(err2);

                        connection.query(
                            `UPDATE delivery SET status = 'Active' WHERE id = ?`,
                            [deliveryAgentId],
                            (err3) => {
                                if (err3) return reject(err3);
                                resolve();
                            }
                        );
                    }
                );
            }
        );
    });
};
