import React from "react";
// Importamos las herramientas que permiten manejar "rutas" o pantallas en React
// BrowserRouter: le dice a React que vamos a usar navegación por rutas
// Routes: agrupa todas las rutas que tendrá la app
// Route: define una ruta específica (por ejemplo, "/" o "/usuarios")
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import './styles.css';
import Header from './components/Header';
import AddUser from "./components/AddUser";



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
  <Route path="/agregar" element={<AddUser />} />
</Routes>

      </div>
    </Router>
  );
}

// Exportamos App para que se pueda usar como punto de inicio de la aplicación
export default App;
