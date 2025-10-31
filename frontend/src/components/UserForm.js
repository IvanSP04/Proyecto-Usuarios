import React, { useEffect, useState } from "react";
import axios from "axios";

const UsuarioForm = ({ recargar, usuarioEditando, setUsuarioEditando }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (usuarioEditando) {
      setNombre(usuarioEditando.nombre);
      setEmail(usuarioEditando.email);
      setTelefono(usuarioEditando.telefono);
    }
  }, [usuarioEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuarioEditando) {
      await axios.put(`http://localhost:5001/usuarios/${usuarioEditando.id}`, {
        nombre,
        email,
        telefono,
      });
      setUsuarioEditando(null);
    } else {
      await axios.post("http://localhost:5001/usuarios", {
        nombre,
        email,
        telefono,
      });
    }

    setNombre("");
    setEmail("");
    setTelefono("");
    recargar();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{usuarioEditando ? "Editar Usuario" : "Nuevo Usuario"}</h3>
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
      />
      <button type="submit">
        {usuarioEditando ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
};

export default UsuarioForm;
