const express = require('express'); // Sirve para crear el servidor en Node.js
const cors = require('cors'); // Linea que me deja conectar el front con el back
const db = require('./config/database'); // Es la que me deja hacer la conexion del sql

const app = express(); // Es para iniciar el servidor
app.use(cors()); // Es la que le pide peticiones al front al back
app.use(express.json()); // Le dice al servidor que entienda los datos JSON que se envían en el cuerpo de las peticiones

app.get('/api/usuarios', (req, res) => { // Esta lee los datos de la tabal de sql 
  db.query('SELECT * FROM usuarios', (err, results) => { // Obtiene los datos de la tabla
    if (err) return res.status(500).json({ error: err.message }); // Me dice que si hay error sale el error 500
    res.json(results); // Si esta bien regresa la lista de usuarios en JSON al front.
  });
});

app.post('/api/usuarios', (req, res) => { // Me deja crear datos nuevos en la base de datos
  const { nombre, email, telefono } = req.body; // Extrae del cuerpo de la petición (JSON) los datos enviados por el frontend
  if (!nombre || !email || !telefono) { // Valida que no falte ningún campo
    return res.status(400).json({ error: 'Faltan datos' }); // 400 = Que falta rellenar algun campo
  }

  const sql = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)'; // Es como en sql me deja insertar los datos del usuario
  db.query(sql, [nombre, email, telefono], (err, result) => { // esta hace que el sql cambie los ? por los datos que ingrese
    if (err) return res.status(500).json({ error: err.message }); // Si hay algo mañ sale el rro 500
    res.json({ message: 'Usuario agregado correctamente', id: result.insertId }); // Esta confirma que el usuario se haya ingresado correctamente
  });
});

app.put('/api/usuarios/:id', (req, res) => { // Uso un Put que me dejar editar o actualizar la información de los usuarios buscando la Id del URL
  const { id } = req.params; // Esta es la que trae a ID del URL
  const { nombre, email, telefono } = req.body; // Usa los nuevos datos que haya actualizado

  const sql = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
  db.query(sql, [nombre, email, telefono, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

app.delete('/api/usuarios/:id', (req, res) => { // Sirve como el delete para eliminar los datos
  const { id } = req.params; // Esta busca el Id para que elimine ese usuario en especifico

  const sql = 'DELETE FROM usuarios WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

// NUEVO: Endpoint para registrar nuevos usuarios
app.post('/api/registro', (req, res) => { // Ruta Post para registrar usuario
  const { nombre, email, telefono, password } = req.body; // Recibe nombre, email, telefono y contraseña

  if (!nombre || !email || !telefono || !password) { // Verifica que no falte ningún dato
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const verificar = 'SELECT * FROM usuarios WHERE email = ?'; // Revisa si el correo ya existe
  db.query(verificar, [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });

    if (results.length > 0) { // Si el correo ya existe manda error
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const sql = 'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)'; // Inserta el nuevo usuario
    db.query(sql, [nombre, email, telefono, password], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuario registrado correctamente', id: result.insertId }); // Confirma que se registro bien
    });
  });
});

app.post('/api/login', (req, res) => {   // Usa la Ruta Post para el inicio de sesión 
  const { email, password } = req.body;   // Resive los datos que haya ingresado en el login

  if (!email || !password) { // Revisa que no falte ningno de los 2 datos
    return res.status(400).json({ error: 'Faltan datos: email y contraseña son requeridos' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ?'; // Revisa que exista el correo 
  db.query(sql, [email], (err, results) => {

    if (err) {  // Error al hacer la consulta a la base de datos
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length === 0) { // Si sale este error significa que el usuario no existe
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const usuario = results[0]; // Esta coge el primer resultado

    if (usuario.password !== password) { // Esta revisa que la contraseña coincida con la que el usuario puso
      return res.status(401).json({ error: 'Contraseña incorrecta' }); // 401 = no autorizado
    }

    res.json({     // Esto es lo que le ice al usuario que ingreso los datos correctamente
      message: 'Login correcto',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol, // Aca dice que rol tiene si es "admin" o "usuario"
      },
    });
  });
});

const PORT = 5001; // El puerto del servidor
app.listen(PORT, () => { // esta es la que reconoce las peticiones
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
