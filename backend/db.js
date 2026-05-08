const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',          // Si en MySQL pusiste contraseña, escríbela aquí. Si no, déjalo vacío.
  database: 'gestion_empleados'
});

module.exports = pool;