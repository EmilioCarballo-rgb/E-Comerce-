const products = require('../models/Product');

const cartController = {
    viewCart: (req, res) => {
        const cart = req.session.cart; 
        let total = 0;

        const cartDetail = cart.map(item => {
            const productData = products.find(p => p.id == item.productId);
            const subtotal = productData.price * item.quantity;
            total += subtotal;
            return {
                ...productData,
                quantity: item.quantity,
                subtotal: subtotal
            };
        });

        res.render("pages/cart", { cart: cartDetail, total: total });
    },

    add: (req, res) => {
        const productId = req.params.id;
        const cart = req.session.cart;
        const itemIndex = cart.findIndex(item => item.productId == productId);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ productId: productId, quantity: 1 });
        }
        res.redirect('/cart');
    },

    increase: (req, res) => {
        const item = req.session.cart.find(i => i.productId == req.params.id);
        if (item) item.quantity += 1;
        res.redirect('/cart');
    },

    decrease: (req, res) => {
        const itemIndex = req.session.cart.findIndex(i => i.productId == req.params.id);
        if (itemIndex !== -1) {
            req.session.cart[itemIndex].quantity -= 1;
            if (req.session.cart[itemIndex].quantity <= 0) {
                req.session.cart.splice(itemIndex, 1);
            }
        }
        res.redirect('/cart');
    },

    empty: (req, res) => {
        req.session.cart = [];
        res.redirect('/cart');
    }
};

module.exports = cartController;