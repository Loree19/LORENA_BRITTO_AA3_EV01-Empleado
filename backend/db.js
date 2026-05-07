const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // Tu usuario de MySQL (normalmente es root)
  password: 'admin',       // Tu contraseña de MySQL (si no tienes, déjalo vacío)
  database: 'gestion_empleados', // El nombre de la base de datos que creaste
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
