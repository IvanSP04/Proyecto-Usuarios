import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";// BrowserRouter: le dice a React que vamos a usar navegación por rutas
import Login from "./components/Login";
import UserList from "./components/UserList";
import './styles.css';
import Header from './components/Header';



// Este es el componente principal de la aplicación
function App() {
  return (
    // El Router envuelve toda la aplicación para permitir la navegación entre rutas
        <Router>
      <div>
        {/* Muestra el encabezado corporativo con logo y nombre */}
        <Header />

        {/* Título general */}
        <h1 className="app-title">Innovación que impulsa el futuro</h1>


        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuarios" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

// Exportamos App para que se pueda usar como punto de inicio de la aplicación
export default App;
