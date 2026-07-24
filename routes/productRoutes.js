const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getIndex); 
// Actualizamos la ruta para que coincida con la US #10
router.get('/categories/:category', productController.getCategory);
router.get('/search', productController.search);

// Le quitamos "/products" y dejamos solo "/:id"
router.get('/:id', productController.getProductById);

module.exports = router;