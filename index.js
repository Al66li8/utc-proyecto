const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');


// Configuración de EJS y carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Carpeta pública para imágenes y CSS
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal (home)
app.get('/', (req, res) => {
  res.render('home', {
    userName: 'Alexia',
    edad: 20,
    ciudad: 'Ciudad de México',
    artista: 'MB & BP',
    telefono: '5578909842',
    colorFavorito: 'Morado'
  });
});

// Ruta para productos
app.get('/productos', (req, res) => {
  const productos = [
    { id: 1, nombre: 'laptop', precio: 5000 },
    { id: 2, nombre: 'telefono', precio: 2000 },
    { id: 3, nombre: 'tableta', precio: 3000 },
  ];
  res.render('productos', { productos });
});

// Ruta para la página con la tabla de alumnos
app.get('/tabla', async (req, res) => {
  try {
    const result = await db.query('SELECT "Nombre", "a_paterno", "a_materno", "edad" FROM "Alumnos"');
    const alumnos = result.rows;  // <-- esta variable existe
    res.render('tabla', { alumnos });  
  } catch (err) {
    console.error('Error consultando alumnos:', err);
    res.send('Error al obtener los datos de los alumnos.');
  }
});


// Ruta para la página con la imagen (la que mencionabas como /pagina)
app.get('/pagina', (req, res) => {
  res.render('pagina');
});


// Iniciamos el servidor en el puerto 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log("Servidor está en el puerto 4000");
});
