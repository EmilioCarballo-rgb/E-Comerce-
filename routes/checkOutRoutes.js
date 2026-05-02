const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// GET: Renderiza la vista del checkout
router.get('/', checkoutController.renderCheckout);

// POST: Recibe los datos del formulario
router.post('/procesar-pago', checkoutController.procesarPago);

module.exports = router;