const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'local',
   user: 'root',
   database: 'node-complete',
   password: '01027112544'
});

module.exports = pool.promise();