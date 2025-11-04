import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  // Estados para guardar los datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  function handleLogin(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Enviamos el email y contraseña al backend
    axios.post('http://localhost:5001/api/login', {
      email: email,
      password: password
    })
      .then(function (respuesta) {
        setMensaje("Bienvenido " + respuesta.data.usuario.nombre);

        // Redirige a la página principal después de 1 segundo
        setTimeout(() => {
          navigate('/usuarios');
        }, 1000);
      })
      .catch(function (error) {
        if (error.response) {
          setMensaje(error.response.data.error);
        } else {
          setMensaje("No se pudo conectar con el servidor");
        }
      });
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <img src="/logo.proyecto.png" alt="Logo" className="login-logo" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <label>Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
}

export default Login;
