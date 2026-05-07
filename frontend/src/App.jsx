import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api/empleados';

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    numero_identificacion: '',
    direccion: '',
    correo_electronico: '',
    dependencia: ''
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editandoId ? 'PUT' : 'POST';
      const url = editandoId ? '${API_URL}/${editandoId}' : API_URL;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert(editandoId ? 'Actualizado' : 'Registrado');
        setForm({ nombre: '', numero_identificacion: '', direccion: '', correo_electronico: '', dependencia: '' });
        setEditandoId(null);
        fetchEmpleados();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (empleado) => {
    setForm({
      nombre: empleado.nombre,
      numero_identificacion: empleado.numero_identificacion,
      direccion: empleado.direccion,
      correo_electronico: empleado.correo_electronico,
      dependencia: empleado.dependencia
    });
    setEditandoId(empleado.id);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar?')) {
      try {
        const res = await fetch('${API_URL}/${id}', { method: 'DELETE' });
        if (res.ok) {
          alert('Eliminado');
          fetchEmpleados();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestión de Empleados</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>{editandoId ? 'Editar' : 'Nuevo'} Empleado</h2>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required style={styles.input} />
        <input name="numero_identificacion" placeholder="Identificación" value={form.numero_identificacion} onChange={handleChange} required style={styles.input} />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} style={styles.input} />
        <input name="correo_electronico" placeholder="Correo" type="email" value={form.correo_electronico} onChange={handleChange} required style={styles.input} />
        <input name="dependencia" placeholder="Dependencia" value={form.dependencia} onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.btn}>{editandoId ? 'Actualizar' : 'Registrar'}</button>
        {editandoId && <button type="button" onClick={() => { setEditandoId(null); setForm({ nombre: '', numero_identificacion: '', direccion: '', correo_electronico: '', dependencia: '' }); }} style={styles.btn}>Cancelar</button>}
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Identificación</th>
            <th style={styles.th}>Dirección</th>
            <th style={styles.th}>Correo</th>
            <th style={styles.th}>Dependencia</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length === 0 ? (
            <tr><td colSpan="7" style={{ textAlign: 'center' }}>Sin registros</td></tr>
          ) : empleados.map(emp => (
            <tr key={emp.id}>
              <td style={styles.td}>{emp.id}</td>
              <td style={styles.td}>{emp.nombre}</td>
              <td style={styles.td}>{emp.numero_identificacion}</td>
              <td style={styles.td}>{emp.direccion}</td>
              <td style={styles.td}>{emp.correo_electronico}</td>
              <td style={styles.td}>{emp.dependencia}</td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(emp)} style={styles.btnSm}>Editar</button>
                <button onClick={() => handleDelete(emp.id)} style={styles.btnSm}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  input: { display: 'block', width: '95%', margin: '8px 0', padding: '10px' },
  btn: { padding: '10px 20px', margin: '5px', cursor: 'pointer' },
  btnSm: { padding: '5px 10px', margin: '2px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2' },
  td: { border: '1px solid #ddd', padding: '8px' }
};

export default App;