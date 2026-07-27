const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Obtener todas las categorías (GET /api/categories)
router.get('/', categoryController.getAll);

// Obtener detalle de una categoría (GET /api/categories/:id)
router.get('/:id', categoryController.getById);

// Crear una nueva categoría (POST /api/categories)
router.post('/', categoryController.create);

// Modificar una categoría (PUT /api/categories/:id)
router.put('/:id', categoryController.update);

// Eliminar una categoría (DELETE /api/categories/:id)
router.delete('/:id', categoryController.delete);

module.exports = router;