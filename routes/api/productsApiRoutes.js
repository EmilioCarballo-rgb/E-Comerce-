const express = require('express');
const router = express.Router();

// Importamos el controlador de la API
const productsApiController = require('../../controllers/api/productsApiController');

// GET /api/products -> Devuelve listado completo
router.get('/', productsApiController.list);

// GET /api/products/:id -> Devuelve detalle de un producto
router.get('/:id', productsApiController.detail);

// POST /api/products -> Crea un nuevo producto
router.post('/', productsApiController.create);

// PUT /api/products/:id -> Actualiza un producto
router.put('/:id', productsApiController.update);

// DELETE /api/products/:id -> Elimina un producto
router.delete('/:id', productsApiController.destroy);

module.exports = router;