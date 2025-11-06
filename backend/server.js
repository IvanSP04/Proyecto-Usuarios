const express = require('express'); // Framework para crear el servidor
const cors = require('cors'); // Permite que el frontend (React) se comunique con el backend
const db = require('./config/database'); // Conexión a MySQL


// CONFIGURACIÓN DEL SERVIDOR
const app = express(); // Creamos la aplicación de Express
app.use(cors()); // Permitimos solicitudes desde otros orígenes (como React)
app.use(express.json()); // Para que el servidor entienda datos en formato JSON

// RUTA: OBTENER TODOS LOS USUARIOS

app.get('/api/usuarios', (req, res) => {
  // Consulta SQL: traer todos los registros de la tabla "usuarios"
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message }); // Si hay error, devolvemos 500 (error de servidor)
    res.json(results); // Si todo va bien, enviamos los usuarios al frontend
  });
});

// RUTA: CREAR UN NUEVO USUARIO


app.post('/api/usuarios', (req, res) => {
  // Obtenemos los datos que vienen del frontend
  const { nombre, email, telefono } = req.body;

  // Validamos que todos los campos estén completos
  if (!nombre || !email || !telefono) {
    return res.status(400).json({ error: 'Faltan datos' }); // 400 = error del usuario (faltan campos)
  }

  // Consulta SQL para insertar el usuario
  const sql = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(sql, [nombre, email, telefono], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario agregado correctamente', id: result.insertId });
  });
});

// RUTA: ACTUALIZAR UN USUARIO EXISTENTE

app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la URL
  const { nombre, email, telefono } = req.body; // Obtenemos los nuevos datos

  // Consulta SQL para actualizar el usuario por su ID
  const sql = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
  db.query(sql, [nombre, email, telefono, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// RUTA: ELIMINAR UN USUARIO

app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la URL

  // Consulta SQL para eliminar el usuario
  const sql = 'DELETE FROM usuarios WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

// RUTA: LOGIN DE USUARIOS

app.post('/api/login', (req, res) => {
  // Obtenemos los datos del cuerpo de la petición (correo y contraseña)
  const { email, password } = req.body;

  // Validamos que los campos no estén vacíos
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan datos: email y contraseña son requeridos' });
  }

  // Consulta SQL para buscar al usuario por su email
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      // Error al hacer la consulta a la base de datos
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    // Si no hay resultados, significa que el correo no existe
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Si existe, tomamos el primer resultado
    const usuario = results[0];

    // Comparamos la contraseña del formulario con la de la base de datos
    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' }); // 401 = no autorizado
    }

    // Si las credenciales son correctas, enviamos los datos del usuario
    res.json({
      message: 'Login correcto',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol, // el rol puede ser "admin" o "usuario"
      },
    });
  });
});

// INICIO DEL SERVIDOR
const PORT = 5001; // Puerto en el que correrá el backend
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
