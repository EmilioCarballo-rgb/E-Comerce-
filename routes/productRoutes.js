const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getIndex); 
// Actualizamos la ruta para que coincida con la US #10
router.get('/categories/:category', productController.getCategory);
router.get('/products/:id', productController.getProductById);

module.exports = router;