const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// 1. OBTENER TODOS LOS EMPLEADOS (READ)
app.get('/api/empleados', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empleados');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. CREAR NUEVO EMPLEADO (CREATE)
app.post('/api/empleados', async (req, res) => {
  try {
    const { nombre, numero_identificacion, direccion, correo_electronico, dependencia } = req.body;
    const [result] = await pool.query(
      'INSERT INTO empleados (nombre, numero_identificacion, direccion, correo_electronico, dependencia) VALUES (?, ?, ?, ?, ?)',
      [nombre, numero_identificacion, direccion, correo_electronico, dependencia]
    );
    res.json({ id: result.insertId, message: 'Empleado registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. ACTUALIZAR EMPLEADO (UPDATE)
app.put('/api/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, numero_identificacion, direccion, correo_electronico, dependencia } = req.body;
    const [result] = await pool.query(
      'UPDATE empleados SET nombre=?, numero_identificacion=?, direccion=?, correo_electronico=?, dependencia=? WHERE id=?',
      [nombre, numero_identificacion, direccion, correo_electronico, dependencia, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ELIMINAR EMPLEADO (DELETE)
app.delete('/api/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM empleados WHERE id=?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('✅ Servidor corriendo en http://localhost:3001');
});
