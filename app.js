const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors'); // 📦 Requisito: Habilitar CORS
const path = require('path');
const app = express();

const session = require('express-session');

// --- MIDDLEWARES GLOBALES ---
app.use(express.json()); // 📦 Requisito: Interpretar JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Permite que el puerto 3000 (React) hable con el 3001 (Express)
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(session({
    secret: 'secreto-ecommerce-mate', 
    resave: false,
    saveUninitialized: true
}));

// --- MIDDLEWARE GLOBAL PARA EL CARRITO ---
app.use((req, res, next) => {
    
    res.locals.cartCount = (req.session && req.session.cart )? req.session.cart.length : 0; 
    next();
});

// --- CONFIGURACIÓN SSR (CLIENTE) ---
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

// --- RUTAS API REST (DASHBOARD REACT) ---
const productsApiRoutes = require('./routes/api/productsApiRoutes');
app.use('/api/products', productsApiRoutes);

// --- RUTAS SSR (E-COMMERCE EJS) ---
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const productsController = require('./controllers/productController');

app.get('/', productsController.index);

app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/category', categoryRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));