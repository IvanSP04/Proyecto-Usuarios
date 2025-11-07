import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5001/api/usuarios", {
      nombre,
      email,
      telefono
    })
    .then(res => {
      setMensaje("✅ Usuario agregado correctamente");
      setNombre("");
      setEmail("");
      setTelefono("");
    })
    .catch(err => {
      console.error(err);
      setMensaje("❌ Error al agregar usuario");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Agregar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <br /><br />
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AddUser;
