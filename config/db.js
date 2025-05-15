const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: '',        
    database: 'hopeconnect_db'
});

db.connect((err) => {
    if (err) {
        console.error('فشل الاتصال بقاعدة البيانات:', err.message);
        return;
    }
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
});

module.exports = db;
