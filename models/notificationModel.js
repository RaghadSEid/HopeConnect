const db = require('../config/db');

exports.getAllNotifications = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM notifications ORDER BY created_at DESC`; 
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};


exports.getNotificationsByDonorId = (donor_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT n.*
            FROM notifications n
            JOIN users u ON n.user_id = u.user_id
            JOIN donors d ON d.user_id = u.user_id
            WHERE d.donor_id = ?
            ORDER BY n.created_at DESC
        `;
        db.query(sql, [donor_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

//exports.sendEmergencyNotificationsToAllUsers = () => {
    //return new Promise((resolve, reject) => {
     //   const message = 'Emergency: A new urgent campaign needs your support ,Plese help as if you can ^_^ ';

     //   const sql = `
      //      INSERT INTO notifications (user_id, message)
       //     SELECT user_id, ? FROM users
       // `;

       // db.query(sql, [message], (err, result) => {
        //    if (err) return reject(err);
       //     resolve(result);
       // });
   // });
//};

const nodemailer = require("nodemailer");

exports.sendEmergencyNotificationsToAllUsers = () => {
    return new Promise((resolve, reject) => {
        const message = '🚨 Emergency: A new urgent campaign needs your support! Please help if you can. 🙏';

        // 1. نجيب كل المستخدمين اللي عندهم إيميل
        const getUsersSql = `SELECT user_id, email, name FROM users WHERE status = 'Active'`;

        db.query(getUsersSql, async (err, users) => {
            if (err) return reject(err);

            if (users.length === 0) {
                return resolve("🚫 لا يوجد مستخدمين لإرسال الإيميلات");
            }

            // 2. نحفظ الإشعارات في قاعدة البيانات
            const insertNotificationsSql = `
                INSERT INTO notifications (user_id, message)
                VALUES ?
            `;
            const notificationValues = users.map(user => [user.user_id, message]);

            db.query(insertNotificationsSql, [notificationValues], async (err) => {
                if (err) return reject(err);

                // 3. نجهز الإرسال عبر Gmail
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 's12112220@stu.najah.edu',
                        pass: 'oenlvorjkkukhcbj' // App Password (بدون فراغات)
                    }
                });

                // 4. نرسل الإيميل لكل مستخدم
                for (let user of users) {
                    const mailOptions = {
                        from: '"Relief System" <your-email@gmail.com>',
                        to: user.email,
                        subject: '🚨 Urgent Campaign Needs Your Help',
                        html: `
                            <h2>🚨 حملة طارئة</h2>
                            <p>مرحبًا ${user.name || ''}،</p>
                            <p>هناك حملة طارئة الآن وتحتاج دعمك! تبرع الآن وساهم في إنقاذ الأرواح 💚</p>
                            <a href="https://yourwebsite.com/emergency" style="padding: 10px 20px; background: red; color: white; text-decoration: none;">ساهم الآن</a>
                            <p>شكرًا لك 🙏</p>
                        `
                    };

                    try {
                        await transporter.sendMail(mailOptions);
                        console.log(`✅ تم إرسال الإيميل إلى: ${user.email}`);
                    } catch (emailErr) {
                        console.error(`❌ فشل في إرسال الإيميل إلى ${user.email}`, emailErr);
                    }
                }

                resolve("📨 تم إرسال كل الإشعارات والإيميلات بنجاح!");
            });
        });
    });
};


exports.notifyVolunteer = (volunteer_id, message, callback) => {
    const sql = `
        INSERT INTO notifications (user_id, message)
        SELECT u.user_id, ? FROM users u
        WHERE u.user_id = (
            SELECT user_id FROM volunteers WHERE volunteer_id = ?
        )
    `;
    db.query(sql, [message, volunteer_id], callback);
};

exports.notifyVolunteersByRequest = (request_id, message, callback) => {
    const sql = `
    INSERT INTO notifications (user_id, message)
    SELECT v.user_id, ?
    FROM volunteer_requests vr
    JOIN volunteers v ON vr.volunteer_id = v.volunteer_id
    WHERE vr.request_id = ?
  `;
    db.query(sql, [message, request_id], callback);
};

exports.notifyOrphanage = (orphanage_id, message, callback) => {
    const sql = `
        INSERT INTO notifications (user_id, message)
        SELECT u.user_id, ? FROM users u
        JOIN orphanages o ON o.user_id = u.user_id
        WHERE o.orphanage_id = ?
    `;
    db.query(sql, [message, orphanage_id], callback);
};