import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; // Para cambiar de página

function Login() { 
  const [esRegistro, setEsRegistro] = useState(false); // Controla si estoy en modo registro o login
  const [nombre, setNombre] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [telefono, setTelefono] = useState('');              //Todas Guardan los datos del usuario
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Para redirigir a otras páginas

  const handleSubmit = (e) => { // Función que se ejecuta al enviar el formulario
    e.preventDefault(); // Evita que la página se recargue
    
    if (esRegistro) { // Si estoy en modo registro
      axios.post('http://localhost:5001/api/registro', { nombre, email, telefono, password }) // Envía los datos al back
        .then(() => { // Si el registro es exitoso
          setMensaje("Registro exitoso"); // Muestra mensaje de éxito
          setEsRegistro(false); // Cambia a modo login
          setNombre(''); 
          setEmail('');                      // Todos Limpian los campos de los datos
          setTelefono('');
          setPassword(''); 
        })
        .catch(() => { // Si hay error en el registro
          setMensaje("Error al registrar"); // Muestra mensaje de error
        });
    } else { // Si estoy en modo login
      axios.post('http://localhost:5001/api/login', { email, password }) // Envía email y contraseña al backend
        .then((res) => { // Si el login es exitoso
          setMensaje("Bienvenido " + res.data.usuario.nombre); // Muestra mensaje de bienvenida
          setTimeout(() => navigate('/usuarios'), 1000); // Redirige a la página de usuarios después de 1 segundo
        })
        .catch(() => { // Si hay error en el login
          setMensaje("Error al iniciar sesión"); // Muestra mensaje de error
        });
    }
  };

  return (
    <div className="login-container">
      <h2>{esRegistro ? 'Registro' : 'Iniciar Sesión'}</h2>
      
      <form onSubmit={handleSubmit}>
        {esRegistro && ( // Solo muestra el campo nombre si estoy en modo registro
          <>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} // Actualiza el valor del nombre
              required
            />
          </>
        )}

        <label>Correo:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualiza el valor del email
          required
        />

        {esRegistro && ( // Solo muestra el campo teléfono si estoy en modo registro
          <>
            <label>Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)} // Actualiza el valor del teléfono
              required
            />
          </>
        )}

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualiza el valor de la contraseña
          required
        />

        <button type="submit">
          {esRegistro ? 'Registrarse' : 'Entrar'}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <p>
        {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
        <button onClick={() => setEsRegistro(!esRegistro)}> 
          {esRegistro ? 'Iniciar sesión' : 'Registrarse'}
        </button>
      </p>
    </div>
  );
}

export default Login;
