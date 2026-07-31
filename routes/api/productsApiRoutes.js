const express = require('express');
const router = express.Router();

// Importamos el controlador de la API que acabas de crear
const productsApiController = require('../../controllers/api/productsApiController');

// Rutas de la API (El prefijo '/api/products' se lo daremos en app.js)
// Corresponde a: GET /api/products
router.get('/', productsApiController.list);

// Corresponde a: GET /api/products/:id
router.get('/:id', productsApiController.detail);

// Más adelante agregaremos las de POST, PUT y DELETE aquí
module.exports = router;