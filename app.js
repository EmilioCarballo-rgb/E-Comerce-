const express = require ('express');
const session = require('express-session');
const app = express();
const port = 3000;

const productRoutes = require ('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

app.set ("view engine", "ejs");

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

// Middleware para inicializar el carrito
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = []; 
    }
    next();
});

//Rutas principales MVC
app.use('/cart', cartRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);

//Manejo de errores
app.use((req, res, next)=> {
  res.status(404).render('pages/404');
});

app.use((err, req, res, next )=>{
  console.error(err.stack);
  res.status(500).render('pages/500');
});


app.listen(port, () => console.log("Servidor abierto en puerto " + port));
