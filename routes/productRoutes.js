const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', productController.getIndex); 

router.get('/category/:categoriaId', productController.getCategory);
router.get('/products/:id', productController.getProductById);

module.exports = router;