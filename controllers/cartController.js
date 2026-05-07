// controllers/cartController.js
const Cart = require('../models/Cart');

const cartController = {
    // Renderiza la vista principal del carrito usando DATOS REALES
    viewCart: (req, res) => {
        const sessionCart = req.session.cart || []; 

        // Usamos los métodos de tu modelo Cart para procesar la sesión
        const cartDetails = Cart.getDetailedCart(sessionCart);
        const total = Cart.calculateTotal(sessionCart);

        res.render("pages/cart", { 
            cart: cartDetails, 
            total: total 
        });
    },

    // Agrega un producto al carrito
    add: (req, res) => {
        const productId = req.params.id;
        const currentCart = req.session.cart || [];

        // Actualizamos la sesión con el retorno del modelo
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

    // Renderiza la vista de Checkout con el total real
    renderCheckout: (req, res) => {
        const sessionCart = req.session.cart || [];
        const total = Cart.calculateTotal(sessionCart);
         
        res.render('pages/checkout', { total: total });
    },

    // Procesa el pago final
    procesarPago: (req, res) => {
        const { nombreCompleto, email, direccion } = req.body;

        console.log(`Procesando pedido para: ${nombreCompleto}`);

        // Vaciamos el carrito tras la compra exitosa
        req.session.cart = [];
        res.send(`¡Pago exitoso! Factura enviada a ${email}`);
    }
};

module.exports = cartController;