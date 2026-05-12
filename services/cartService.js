const Cart = require('../models/Cart');

const cartService = {

    init: (req) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
    },

    getDetailedCart: (req) => {
        return Cart.getDetailedCart(req.session.cart);
    },

    calculateTotal: (req) => {
        return Cart.calculateTotal(req.session.cart);
    },

    getCount: (req) => {
        return req.session.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    addItem: (req, productId) => {
        req.session.cart = Cart.addItem(req.session.cart, productId);
    },

    increaseItem: (req, productId) => {
        req.session.cart = Cart.increaseItem(req.session.cart, productId);
    },

    decreaseItem: (req, productId) => {
        req.session.cart = Cart.decreaseItem(req.session.cart, productId);
    },

    removeItem: (req, productId) => {
        req.session.cart = Cart.removeItem(req.session.cart, productId);
    },

    empty: (req) => {
        req.session.cart = [];
    }
};

module.exports = cartService;
