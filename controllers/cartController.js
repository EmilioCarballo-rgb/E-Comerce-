const cartService = require('../services/cartService');

const cartController = {

    viewCart: (req, res) => {
        res.render("pages/cart", {
            cart: cartService.getDetailedCart(req),
            total: cartService.calculateTotal(req)
        });
    },

    add: (req, res) => {
        cartService.addItem(req, req.params.id);
        res.redirect('/cart');
    },

    increase: (req, res) => {
        cartService.increaseItem(req, req.params.id);
        res.redirect('/cart');
    },

    decrease: (req, res) => {
        cartService.decreaseItem(req, req.params.id);
        res.redirect('/cart');
    },

    remove: (req, res) => {
        cartService.removeItem(req, req.params.id);
        res.redirect('/cart');
    },

    empty: (req, res) => {
        cartService.empty(req);
        res.redirect('/cart');
    },

    renderCheckout: (req, res) => {
        res.render('pages/checkout', { total: cartService.calculateTotal(req) });
    },

    procesarPago: (req, res) => {
        const { nombreCompleto, email } = req.body;
        console.log(`Procesando pedido para: ${nombreCompleto}`);
        cartService.empty(req);
        res.send(`¡Pago exitoso! Factura enviada a ${email}`);
    }
};

module.exports = cartController;
