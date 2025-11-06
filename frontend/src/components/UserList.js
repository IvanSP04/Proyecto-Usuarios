import React, { useState, useEffect } from "react";
import axios from "axios"; // Esto es para hacerle las peticiones al back
import UserForm from "./UserForm";

function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  useEffect(() => { // Al iniciar el componente llamo a la función que trae todos los usuarios desde el backend
  cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => { // Pido los usuarios al servidor y los guardo en el estado para mostrarlos en pantalla.
  const res = await axios.get("http://localhost:5001/api/usuarios");
    setUsuarios(res.data);
  };

  const eliminar = async (id) => { // Elimina un usuario usando su ID y recarga la lista para mostrar los cambios.
    await axios.delete(`http://localhost:5001/api/usuarios/${id}`);
    cargarUsuarios();
  };

  return (
    <div>
      <h2>Usuarios</h2>

      <UserForm  // Inserto el formulario, pasándole funciones y datos que necesita para crear o editar usuarios.
        recargar={cargarUsuarios} // Es que me permite que el formulario vuelva  a traer a los usuarios
        usuarioEditando={usuarioEditando} // Es la del usuario que estoy editando
        setUsuarioEditando={setUsuarioEditando} // Para cambiar a ese usuario que estoy editando
      />

      <table> 
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => ( // Este es el que recorre el array
            <tr key={u.id}> 
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td>
                <button onClick={() => setUsuarioEditando(u)}>Editar</button> 
                <button onClick={() => eliminar(u.id)}>Eliminar</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
