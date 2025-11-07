import React, { useState, useEffect } from "react";
import axios from "axios";

function UserForm({ recargar, usuarioEditando, setUsuarioEditando }) { //Los tres props del UserList
  const [nombre, setNombre] = useState(""); 
  const [email, setEmail] = useState("");    // Estos tres son los valores que se escribe en los inputs
  const [telefono, setTelefono] = useState("");

  useEffect(() => { // Cuando se elige un usuario para editar lleno los campos del formulario con sus datos actuales
    if (usuarioEditando) {
      setNombre(usuarioEditando.nombre);
      setEmail(usuarioEditando.email);
      setTelefono(usuarioEditando.telefono);
    }
  }, [usuarioEditando]);

  const guardar = async (e) => { // Evito que el formulario recargue la página al presionar el botón
    e.preventDefault();

    if (usuarioEditando) {
      await axios.put(
        `http://localhost:5001/api/usuarios/${usuarioEditando.id}`,
        { nombre, email, telefono }
      );                                // Si hay un usuario seleccionado, actualizo sus datos. Si no, creo uno nuevo en la base de datos.
      setUsuarioEditando(null);
    } else {
      await axios.post("http://localhost:5001/api/usuarios", {
        nombre,
        email,
        telefono
      });
    }
  
    setNombre(""); 
    setEmail("");       // Limpio los campos y vuelvo a cargar la lista de usuarios actualizada.
    setTelefono("");
    recargar();
  };

  return (  // Formulario principal el título cambia según si se edita o se crea un usuario
    <form onSubmit={guardar}>
      <h3>{usuarioEditando ? "Editar" : "Nuevo"}</h3>
      
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input                  // Inputs controlados: cada campo actualiza su propio valor en el estado cuando el usuario escribe
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
}

export default UserForm;
