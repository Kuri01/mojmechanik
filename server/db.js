const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sqlagent',
    database: 'backend_app',
});

module.exports = pool.promise();
