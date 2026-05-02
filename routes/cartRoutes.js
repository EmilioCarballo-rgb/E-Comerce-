const express = require('express');
const router = express.Router();
// Importamos el controlador (lo crearemos en el siguiente paso)
const cartController = require('../controllers/cartController');

// Escenario 2: Ver el carrito
router.get('/', cartController.viewCart);

// Escenario 1: Agregar producto
router.post('/add/:id', cartController.add);

// Escenario 3: Aumentar y disminuir cantidades
router.post('/increase/:id', cartController.increase);
router.post('/decrease/:id', cartController.decrease);

// Escenario 4: Vaciar carrito
router.post('/empty', cartController.empty);

module.exports = router;