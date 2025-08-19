const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

// -----------------------------
// Configuración de EJS y carpeta de vistas
// -----------------------------
// Forzar ruta absoluta para views en Render
const viewsPath = path.join(process.cwd(), 'views');
console.log('Carpeta de vistas:', viewsPath);
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Carpeta pública para imágenes y CSS
app.use(express.static(path.join(process.cwd(), 'public')));

// -----------------------------
// Rutas
// -----------------------------

// Página principal (home)
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

// Productos
app.get('/productos', (req, res) => {
  const productos = [
    { id: 1, nombre: 'laptop', precio: 5000 },
    { id: 2, nombre: 'telefono', precio: 2000 },
    { id: 3, nombre: 'tableta', precio: 3000 },
  ];
  res.render('productos', { productos });
});

// Tabla de alumnos
app.get('/tabla', async (req, res) => {
  try {
    const result = await db.query('SELECT "Nombre", "a_paterno", "a_materno", "edad" FROM "Alumnos"');
    const alumnos = result.rows;

    // Render con manejo de error visual
    if (!alumnos || alumnos.length === 0) {
      return res.send('No se encontraron alumnos.');
    }

    res.render('Tabla', { alumnos });

  } catch (err) {
    console.error('Error consultando alumnos:', err);
    res.status(500).send(`<pre>${err}</pre>`); // Muestra error completo en Render
  }
});

// Página con imagen (/pagina)
app.get('/pagina', (req, res) => {
  res.render('pagina');
});

// Iniciamos el servidor en el puerto 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log("Servidor está en el puerto 4000");
});
