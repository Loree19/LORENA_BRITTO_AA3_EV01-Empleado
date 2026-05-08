const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET: Listar
app.get('/api/empleados', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empleados');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Crear
app.post('/api/empleados', async (req, res) => {
  try {
    const { nombre, numero_identificacion, direccion, correo_electronico, dependencia } = req.body;
    const sql = 'INSERT INTO empleados (nombre, numero_identificacion, direccion, correo_electronico, dependencia) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.query(sql, [nombre, numero_identificacion, direccion, correo_electronico, dependencia]);
    res.json({ id: result.insertId, message: 'Empleado registrado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT: Actualizar
app.put('/api/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, numero_identificacion, direccion, correo_electronico, dependencia } = req.body;
    const sql = 'UPDATE empleados SET nombre=?, numero_identificacion=?, direccion=?, correo_electronico=?, dependencia=? WHERE id=?';
    const [result] = await pool.query(sql, [nombre, numero_identificacion, direccion, correo_electronico, dependencia, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Empleado actualizado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE: Eliminar
app.delete('/api/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM empleados WHERE id=?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Empleado eliminado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, () => console.log('✅ Servidor en http://localhost:3001SSssssss'));