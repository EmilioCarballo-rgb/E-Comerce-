const cartService = require('../services/cartService');
const normalizeId = require('../utils/normalizeId');

const cartController = {

    viewCart: (req, res) => {
        res.render("pages/cart", {
            cart: cartService.getCartDetails(req),
            total: cartService.calculateTotal(req)
        });
    },

    add: (req, res) => {
        const { id, status } = normalizeId(req.params.id);
        if (status) {
            if (req.headers.accept && req.headers.accept.includes('application/json')) {
                return res.status(status).json({ error: 'Error procesando el ID' });
            }
            return res.status(status).render(`pages/${status}`);
        }
        
        cartService.addItem(req, id);
        
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.json({ success: true, message: 'Producto agregado al carrito' });
        }
        
        res.redirect('/cart');
    },

    increase: (req, res) => {
        const { id, status } = normalizeId(req.params.id);
        if (status) return res.status(status).render(`pages/${status}`);
        cartService.increaseItem(req, id);
        res.redirect('/cart');
    },

    decrease: (req, res) => {
        const { id, status } = normalizeId(req.params.id);
        if (status) return res.status(status).render(`pages/${status}`);
        cartService.decreaseItem(req, id);
        res.redirect('/cart');
    },

    remove: (req, res) => {
        const { id, status } = normalizeId(req.params.id);
        if (status) return res.status(status).render(`pages/${status}`);
        cartService.removeItem(req, id);
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
