const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();


const productsApiRoutes = require('./routes/api/productsApiRoutes');
const categoriesApiRoutes = require('./routes/api/categoriesApiRoutes'); 
const statsApiRoutes = require('./routes/api/statsApiRoutes'); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layouts/main');


app.use('/api/products', productsApiRoutes);
app.use('/api/categories', categoriesApiRoutes); 
app.use('/api/stats', statsApiRoutes);


app.use(session({
    secret: 'secreto-ecommerce-mate', 
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.cartCount = (req.session && req.session.cart ) ? req.session.cart.length : 0; 
    next();
});


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));


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