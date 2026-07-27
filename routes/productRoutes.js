const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Leer todos (GET /api/products)
router.get('/', productController.getAll);

// Leer uno específico (GET /api/products/:id)
router.get('/:id', productController.getById);

// Crear (POST /api/products)
router.post('/', productController.create);

// Actualizar (PUT /api/products/:id)
router.put('/:id', productController.update);

// Eliminar (DELETE /api/products/:id)
router.delete('/:id', productController.delete);

// router.get('/categories/:category', productController.getCategory);
// router.get('/search', productController.search);

module.exports = router;