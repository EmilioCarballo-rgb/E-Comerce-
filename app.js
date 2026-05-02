const express = require ('express');
const app = express();
const port = 3000;
const productRoutes = require('./routes/productRoutes');
const session = require('express-session');

const products = require('./models/Product');

app.set ("view engine", "ejs");

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

// Importamos las rutas del carrito
const cartRoutes = require('./routes/cartRoutes');

app.use('/cart', cartRoutes);
app.use('/', productRoutes);

// --- RUTAS ---

app.get("/category/:categoriaId", (req,res) => {
  const categoriaElegida = req.params.categoriaId;
  const productosFiltrados = products.filter(p => p.category === categoriaElegida);
  // Eliminamos 'user' de aquí porque no está definido y rompe la app
  res.render("pages/index", { products: productosFiltrados });
});

app.get("/products/:id", (req, res) => {
    const idSeleccionado = parseInt(req.params.id); 
    const productoEncontrado = products.find( p => p.id === idSeleccionado );

    if (productoEncontrado) {
        res.render("pages/products", { products: productoEncontrado });
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

app.get("/register", (req, res) => { res.render("pages/register", {}) });
app.get("/login", (req, res) => { res.render("pages/login", {}) });

app.post("/register", (req, res) => { res.redirect("/"); });
app.post("/login", (req, res) => { res.redirect("/"); });

app.use((req, res, next) => {
    // no encontrado
    res.status(404).render('pages/404'); 
});

app.use((err, req, res, next) => {
    // Esto imprime el error feo y real en TU terminal (para que vos como programador lo puedas arreglar)
    console.error(err.stack); 
    
    // Esto le manda al usuario la pantalla linda, sin filtrar información sensible (Validación OK)
    res.status(500).render('pages/500'); 
});

app.listen(port, ()=> console.log("Servidor abierto en puerto " + port));