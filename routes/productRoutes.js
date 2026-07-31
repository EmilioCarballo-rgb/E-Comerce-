const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');

// Mostrar el catálogo de productos (GET /)
router.get('/', productsController.index);

// Mostrar el detalle de un producto específico (GET /:id)
router.get('/:id', productsController.detail);

module.exports = router;