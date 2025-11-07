const express = require("express");
const router = express.Router();
const connection = require("../config/database");

// 🔹 Listar todos los usuarios
router.get("/", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
    res.json(results);
  });
});

// 🔹 Crear usuario
router.post("/", (req, res) => {
  const { nombre, email, telefono } = req.body;
  connection.query(
    "INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)",
    [nombre, email, telefono],
    (err, result) => {
      if (err) {
        console.error("Error al insertar usuario:", err);
        return res.status(500).json({ error: "Error al insertar usuario" });
      }
      res.json({ message: "Usuario agregado correctamente", id: result.insertId });
    }
  );
});

// 🔹 Actualizar usuario
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  connection.query(
    "UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?",
    [nombre, email, telefono, id],
    (err) => {
      if (err) {
        console.error("Error al actualizar usuario:", err);
        return res.status(500).json({ error: "Error al actualizar usuario" });
      }
      res.json({ message: "Usuario actualizado correctamente" });
    }
  );
});

// 🔹 Eliminar usuario
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  });
});

module.exports = router;
