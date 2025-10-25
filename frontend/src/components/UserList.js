import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  // Obtener los usuarios del backend
  useEffect(() => {
    axios.get("http://localhost:5001/api/usuarios")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error("❌ Error al obtener usuarios:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Usuarios</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "10px", width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
