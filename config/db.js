const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: '',        
    database: 'hopeconnect_db'
});

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
        return;
    }
    console.log('Successfully connected to the database');
});

module.exports = db;
