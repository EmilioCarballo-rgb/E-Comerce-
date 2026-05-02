const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Línea 7: Revisá que getIndex esté bien escrito y que el controlador esté bien importado
router.get('/', productController.getIndex); 

module.exports = router;