// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Visualización
router.get('/', cartController.viewCart);
router.get('/checkout', cartController.renderCheckout);

// Acciones de modificación (Idealmente usaríamos POST/PUT, pero mantenemos GET por compatibilidad con tu estructura de links <a> actual)
router.get('/add/:id', cartController.add);
router.get('/increase/:id', cartController.increase);
router.get('/decrease/:id', cartController.decrease);
router.get('/empty', cartController.empty);

// Procesamiento de formulario (Este DEBE ser POST)
router.post('/procesar-pago', cartController.procesarPago);

module.exports = router;