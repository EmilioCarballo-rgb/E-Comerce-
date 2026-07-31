const db = require('../db/database');

const cartService = {
    init: (req) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
    },

    addItem: (req, productId, quantity = 1) => {
        cartService.init(req);
        const product = db.prepare("SELECT id, name, price FROM products WHERE id = ?").get(productId);
        if (!product) return;

        const existing = req.session.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += parseInt(quantity) || 1;
        } else {
            req.session.cart.push({ id: product.id, quantity: parseInt(quantity) || 1 });
        }
    },


    getCartDetails: (req) => {
        cartService.init(req);
        return req.session.cart.map(item => {

            const product = db.prepare("SELECT * FROM products WHERE id = ?").get(item.id);
            
            return {
                ...product, 
                quantity: item.quantity,
                subtotal: product.price * item.quantity 
            };
        });
    },

    calculateTotal: (req) => {
        const details = cartService.getCartDetails(req);
        return details.reduce((total, item) => total + item.subtotal, 0);
    },

    getCount: (req) => {
        cartService.init(req);
        if (!req.session.cart) return 0;
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