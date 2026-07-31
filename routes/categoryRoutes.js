const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// 1. Primero la ruta por nombre de categoría (para el E-commerce)
router.get('/:categoryName', categoryController.getByCategoryName);

// 2. Luego las rutas de la API (sin duplicados)
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;