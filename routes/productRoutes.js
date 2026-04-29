const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Definición de rutas
router.get("/", productController.getIndex);
router.get("/category/:categoriaId", productController.getByCategory);
router.get("/products/:id", productController.getDetail);

module.exports = router;