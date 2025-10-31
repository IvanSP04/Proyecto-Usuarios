import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css"; // 🎨 Importa el CSS moderno

function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [editId, setEditId] = useState(null);

  // 🟢 Obtener usuarios de la base de datos
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  // 🟢 Guardar o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoUsuario = { nombre, email, telefono };

    try {
      if (editId) {
        await axios.put(`http://localhost:5001/api/usuarios/${editId}`, nuevoUsuario);
      } else {
        await axios.post("http://localhost:5001/api/usuarios", nuevoUsuario);
      }

      // Limpiar formulario
      setNombre("");
      setEmail("");
      setTelefono("");
      setEditId(null);
      fetchUsuarios();
    } catch (err) {
      console.error("Error al guardar usuario:", err);
    }
  };

  // 🟡 Editar usuario
  const handleEdit = (usuario) => {
    setEditId(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setTelefono(usuario.telefono);
  };

  // 🔴 Eliminar usuario
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:5001/api/usuarios/${id}`);
        fetchUsuarios();
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
      }
    }
  };

  return (
    <div className="container">
      <h2>Gestión de Usuarios</h2>

      {/* 🟢 FORMULARIO PRINCIPAL */}
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      {/* 🧾 TABLA DE USUARIOS */}
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td>
                <button className="editar" onClick={() => handleEdit(u)}>
                  Editar
                </button>
                <button className="eliminar" onClick={() => handleDelete(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
