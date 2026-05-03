// controllers/cartController.js
const Cart = require('../models/Cart');

const cartController = {
    // Renderiza la vista principal del carrito
    viewCart: (req, res) => {
        const sessionCart = req.session.cart || []; 

        const cartDetails = Cart.getDetailedCart(sessionCart);
        const total = Cart.calculateTotal(sessionCart);

        res.render("pages/cart", { cart: cartDetails, total: total });
    },

    // Agrega un producto al carrito
    add: (req, res) => {
        const productId = req.params.id;
        const currentCart = req.session.cart || [];
        
        // Delegación al Modelo y actualización de sesión
        req.session.cart = Cart.addItem(currentCart, productId);
        
        res.redirect('/cart');
    },

    // Aumenta la cantidad de un producto (+1)
    increase: (req, res) => {
        const productId = req.params.id;
        const currentCart = req.session.cart || [];
        
        req.session.cart = Cart.increaseItem(currentCart, productId);
        
        res.redirect('/cart');
    },

    // Disminuye la cantidad de un producto (-1)
    decrease: (req, res) => {
        const productId = req.params.id;
        const currentCart = req.session.cart || [];
        
        req.session.cart = Cart.decreaseItem(currentCart, productId);
        
        res.redirect('/cart');
    },

    // Vacía el carrito por completo
    empty: (req, res) => {
        req.session.cart = [];
        res.redirect('/cart');
    },

    // Renderiza la vista de Checkout
    renderCheckout: (req, res) => {
        const sessionCart = req.session.cart || [];
        
        const total = Cart.calculateTotal(sessionCart);
            
        res.render('pages/checkout', { total: total });
    },

    // Procesa el pago final
    procesarPago: (req, res) => {
        const { nombreCompleto, email, direccion } = req.body;

        // Simulamos el procesamiento del pago...
        console.log(`Procesando pedido para: ${nombreCompleto}`);
        
        // Vaciamos el carrito tras la compra exitosa
        req.session.cart = [];
        res.send(`¡Pago exitoso! Factura enviada a ${email}`);
    }
};

module.exports = cartController;