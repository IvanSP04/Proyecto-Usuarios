const mysql = require('mysql2'); // Importa el módulo de MySQL para conectar con la base de datos
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const connection = mysql.createConnection({ // Crea la conexión a la base de datos
  host: 'localhost', // Servidor donde está la base de datos (en este caso local)
  user: 'root', // Usuario de MySQL
  password: 'Alm#ntolado22', // Contraseña de MySQL
  database: 'usuarios_app' // Nombre de la base de datos que vamos a usar
});

connection.connect((err) => { // Intenta conectar a la base de datos
  if (err) { // Si hay error al conectar
    console.error('Error conectando a la base de datos:', err); // Muestra el error en consola
    return; // Detiene la ejecución
  }
  console.log('✅ Conectado a MySQL desde database.js'); // Confirma que la conexión fue exitosa
});

module.exports = connection; // Exporta la conexión para usarla en otros archivos
