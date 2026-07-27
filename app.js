const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts'); // <-- 1. Importamos la librería
const cors = require('cors'); // <-- NUEVO: Importamos cors
const statsRoutes = require('./routes/statsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const db = require('./db/database');
const app = express();
const port = 3000;

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const cartService = require('./services/cartService');

// --- MIDDLEWARES GLOBALES (CORS y Body Parsers) ---
app.use(cors()); // <-- NUEVO: Usamos cors para permitir peticiones desde React

// Permite a Express decodificar los formularios HTML
app.use(express.urlencoded({ extended: true }));
// Permite a Express decodificar peticiones en formato JSON (¡Ya lo tenías, perfecto!)
app.use(express.json());

// --- CONFIGURACIÓN DE VISTAS (EJS) ---
app.use(express.static('public'));
app.set("view engine", "ejs");

// --- CONFIGURACIÓN DE LAYOUTS (US #14) ---
app.use(expressLayouts); // <-- 2. Usamos el middleware
app.set('layout', 'layouts/main'); // <-- 3. Definimos la ruta del layout base

// --- SESIÓN Y CARRITO ---
app.use(session({
    secret: 'ecommerce_secret_key' ,
    resave: false,                 
    saveUninitialized: true,      
    cookie: { secure: false }
}));

// Middleware para inicializar el carrito y exponerlo globalmente
app.use((req, res, next) => {
    // 1. Inicializamos si no existe
    cartService.init(req);

    // 2. Intentamos obtener el conteo, si falla o es undefined, forzamos 0
    const count = cartService.getCount(req);
    res.locals.cartCount = count || 0; 
    
    next();
});

// --- RUTAS ---
app.use('/cart', cartRoutes);
app.use('/', userRoutes);
app.use('/api/stats', statsRoutes);

// NUEVO: Reemplazamos app.use('/', productRoutes) por el prefijo de la API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// --- MANEJO DE ERRORES ---
app.use((_req, res, _next) => {
  res.status(404).render('pages/404');
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).render('pages/500');
});

app.listen(port, () => console.log("Servidor abierto en puerto " + port));