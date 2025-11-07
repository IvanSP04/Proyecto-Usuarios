# Proyecto de Login y Registro con React y Axios

Este proyecto es una aplicación web que permite registrar e iniciar sesión de usuarios utilizando React, Axios y React Router DOM.  
El sistema se conecta con un backend en Node.js / Express para manejar la autenticación de usuarios.

---

## Tecnologías utilizadas

- React – Librería para construir interfaces de usuario.  
- Axios – Cliente HTTP para realizar peticiones al servidor.  
- React Router DOM – Manejo de rutas y navegación entre vistas.  
- Node.js / Express (Backend) – Servidor API para gestionar usuarios y autenticación.  
- MongoDB (opcional) – Base de datos para almacenar la información de los usuarios.

---

## Estructura del proyecto

src/
│
├── components/
│ └── Login.js # Componente principal con formulario de login y registro
│
├── App.js # Configura las rutas de navegación
├── index.js # Punto de entrada de la aplicación React
└── README.md # Archivo de documentación del proyecto

---

## Instalación y ejecución

Sigue estos pasos para ejecutar el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   
2.  Entra a la carpeta del proyecto:
cd tu-repo

3. Instala las dependencias:
npm install

4. Ejecuta el servidor de desarrollo:
npm start

Nota: Asegúrate de tener corriendo tu backend en http://localhost:5001, ya que el frontend se comunica con él para las rutas /api/login y /api/registro.

---

Funcionalidades principales:

- Registro de nuevos usuarios con nombre, correo y contraseña.
- Inicio de sesión validado desde el servidor.
- Redirección automática a la página de usuarios después de iniciar sesión.
- Mensajes en pantalla de éxito o error según la acción realizada.
- Cambio de vista entre formulario de inicio de sesión y registro.

---

Uso:

- Abre la aplicación en el navegador (por defecto en http://localhost:3000).
- Si no tienes cuenta, selecciona la opción de registro e ingresa tus datos.
- Si ya tienes cuenta, inicia sesión con tu correo y contraseña.
- Al iniciar sesión correctamente, serás redirigido a la sección de usuarios.

---

Autor
Ivan Sterling
GitHub: @ivansp04
