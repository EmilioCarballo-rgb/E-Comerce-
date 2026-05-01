const Cart = require('../models/Cart');
const Product = require('../models/Product');
// Simulamos que el carrito y el usuario vienen de algún estado global o base de datos
// En el futuro, esto vendrá de req.session o de un JWT
const cartProducts = []; 
const currentUser = null; 

const cartController = {
    // Renderiza la vista principal del carrito
    getCart: (req, res) => {
        const total = Cart.calculateTotal(cartProducts);
        res.render("pages/cart", { products: cartProducts, user: currentUser, total: total });
    },

    // Agrega un producto
    addItem: (req, res) => {
        const productId = parseInt(req.params.id);
        
        const productoElegido = Product.findById(idProducto);
        // const productoElegido = Product.findById(productId);
        
        cartProducts = Cart.addProduct(cartProducts, productoElegido);
        
        res.redirect("/");
    },

    // Renderiza el Checkout
    getCheckout: (req, res) => {
        const total = Cart.calculateTotal(cartProducts);
        res.render("pages/checkout", { user: currentUser, cart: cartProducts, total: total });
    },
    
    // ... aquí faltarían tus funciones de quitar y actualizar cantidad

    updateQuantity: (req, res ) => {
        const productId = parseInt(req.params.id);
    }
};

module.exports = cartController;