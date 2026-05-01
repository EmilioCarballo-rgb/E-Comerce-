const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Si en app.js delegamos '/cart' hacia aquí, estas rutas se suman a ese prefijo
router.get('/', cartController.getCart); // Responde a '/cart'
router.get('/checkout', cartController.getCheckout); // Responde a '/cart/checkout'
router.get('/add/:id', cartController.addItem); // Responde a '/cart/add/:id'

module.exports = router;