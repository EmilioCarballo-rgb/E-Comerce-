const db = require('../db/database'); // Importamos la conexión a SQLite

const cartService = {
    // Inicializa el carrito en la sesión si no existe
    init: (req) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
    },

    // Agrega un producto (guardamos solo ID y cantidad)
    addItem: (req, productId, quantity = 1) => {
        const product = db.prepare("SELECT id, name, price FROM products WHERE id = ?").get(productId);
        if (!product) return;

        const existing = req.session.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += parseInt(quantity) || 1;
        } else {
            req.session.cart.push({ id: product.id, quantity: parseInt(quantity) || 1 });
        }
    },

    // Obtiene los productos del carrito con datos frescos de la DB
    getCartDetails: (req) => {
        return req.session.cart.map(item => {
            // Buscamos los datos actuales en SQLite
            const product = db.prepare("SELECT * FROM products WHERE id = ?").get(item.id);
            
            return {
                ...product, // Traemos todos los datos (nombre, imagen, etc.)
                quantity: item.quantity,
                subtotal: product.price * item.quantity // Calculamos el subtotal real
            };
        });
    },

    // Calcula el total del carrito usando precios de la base de datos
    calculateTotal: (req) => {
        const details = cartService.getCartDetails(req);
        return details.reduce((total, item) => total + item.subtotal, 0);
    },

    getCount: (req) => {
        if (!req.session.cart) return 0;
        // Sumamos la cantidad (quantity) de cada item
        return req.session.cart.reduce((total, item) => total + item.quantity, 0);
},

    removeItem: (req, productId) => {
        req.session.cart = req.session.cart.filter(item => item.id != productId);
    },

    increaseItem: (req, productId) => {
        const item = req.session.cart.find(i => i.id == productId);
        if (item) item.quantity += 1;
    },

    decreaseItem: (req, productId) => {
        const item = req.session.cart.find(i => i.id == productId);
        if (!item) return;
        item.quantity -= 1;
        if (item.quantity <= 0) cartService.removeItem(req, productId);
    },

    empty: (req) => {
        req.session.cart = [];
    }
};

module.exports = cartService;