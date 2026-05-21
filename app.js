const express = require ('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts'); // <-- 1. Importamos la librería
const db = require('./db/database');
const app = express();
const port = 3000;

const productRoutes = require ('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const cartService = require('./services/cartService');

app.use(express.static('public'));

app.set ("view engine", "ejs");

// --- CONFIGURACIÓN DE LAYOUTS (US #14) ---
app.use(expressLayouts); // <-- 2. Usamos el middleware
app.set('layout', 'layouts/main'); // <-- 3. Definimos la ruta del layout base

// --- MIDDLEWARES DE TRADUCCIÓN ---
// Permite a Express decodificar los formularios HTML
app.use(express.urlencoded({ extended: true }));
// Permite a Express decodificar peticiones en formato JSON
app.use(express.json());

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

//Rutas principales MVC
app.use('/cart', cartRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);

//Manejo de errores
app.use((_req, res, _next) => {
  res.status(404).render('pages/404');
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).render('pages/500');
});

app.listen(port, () => console.log("Servidor abierto en puerto " + port));