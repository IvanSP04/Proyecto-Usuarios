const express = require("express"); // Sirve para crear el servidor en Node.js
const router = express.Router(); // Crea un router para manejar las rutas
const connection = require("../config/database"); // Conexión a la base de datos MySQL

// Listar todos los usuarios
router.get("/", (req, res) => { // Ruta GET para obtener todos los usuarios
  connection.query("SELECT * FROM usuarios", (err, results) => { // Consulta sql para traer todos los usuarios
    if (err) { // Si hay error en la consulta
      console.error("Error al obtener usuarios:", err); // Muestra el error en consola
      return res.status(500).json({ error: "Error al obtener usuarios" }); // Responde con error 500
    }
    res.json(results); // Si todo está bien devuelve la lista de usuarios en JSON
  });
});

// Crear usuario
router.post("/", (req, res) => { // Ruta POST para crear un nuevo usuario
  const { nombre, email, telefono } = req.body; // Extrae los datos del cuerpo de la petición
  connection.query( // Consulta SQL para insertar un nuevo usuario
    "INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)",
    [nombre, email, telefono], // Los valores que se van a insertar
    (err, result) => { // Callback que se ejecuta después de la consulta
      if (err) { // Si hay error al insertar
        console.error("Error al insertar usuario:", err); // Muestra el error en consola
        return res.status(500).json({ error: "Error al insertar usuario" }); // Responde con error 500
      }
      res.json({ message: "Usuario agregado correctamente", id: result.insertId }); // Confirma que se agregó el usuario
    }
  );
});

// Actualizar usuario
router.put("/:id", (req, res) => { // Ruta PUT para actualizar un usuario por su ID
  const { id } = req.params; // Obtiene el ID del usuario desde la URL
  const { nombre, email, telefono } = req.body; // Obtiene los nuevos datos del usuario
  connection.query( // Consulta SQL para actualizar el usuario
    "UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?",
    [nombre, email, telefono, id], // Los valores que se van a actualizar
    (err) => { // Callback que se ejecuta después de la consulta
      if (err) { // Si hay error al actualizar
        console.error("Error al actualizar usuario:", err); // Muestra el error en consola
        return res.status(500).json({ error: "Error al actualizar usuario" }); // Responde con error 500
      }
      res.json({ message: "Usuario actualizado correctamente" }); // Confirma que se actualizó el usuario
    }
  );
});

// Eliminar usuario
router.delete("/:id", (req, res) => { // Ruta DELETE para eliminar un usuario por su ID
  const { id } = req.params; // Obtiene el ID del usuario desde la URL
  connection.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => { // Consulta SQL para eliminar el usuario
    if (err) { // Si hay error al eliminar
      console.error("Error al eliminar usuario:", err); // Muestra el error en consola
      return res.status(500).json({ error: "Error al eliminar usuario" }); // Responde con error 500
    }
    res.json({ message: "Usuario eliminado correctamente" }); // Confirma que se eliminó el usuario
  });
});

module.exports = router; // Exporta el router para usarlo en el servidor principal
