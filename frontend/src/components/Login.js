import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (esRegistro) {
      axios.post('http://localhost:5001/api/registro', { nombre, email, password })
        .then(() => {
          setMensaje("Registro exitoso");
          setEsRegistro(false);
          setNombre('');
          setEmail('');
          setPassword('');
        })
        .catch(() => {
          setMensaje("Error al registrar");
        });
    } else {
      axios.post('http://localhost:5001/api/login', { email, password })
        .then((res) => {
          setMensaje("Bienvenido " + res.data.usuario.nombre);
          setTimeout(() => navigate('/usuarios'), 1000);
        })
        .catch(() => {
          setMensaje("Error al iniciar sesión");
        });
    }
  };

  return (
    <div className="login-container">
      <h2>{esRegistro ? 'Registro' : 'Iniciar Sesión'}</h2>
      
      <form onSubmit={handleSubmit}>
        {esRegistro && (
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        )}

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