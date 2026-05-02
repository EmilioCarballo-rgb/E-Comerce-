// Importamos los datos (asegúrate de que la ruta y el nombre 'Product' sean correctos)
const products = require('../models/Product'); 

const productController = {
    // Esta es la función que busca tu archivo de rutas en la línea 7
    getIndex: (req, res) => {
        // Renderiza la vista 'index' pasando el array de productos
        res.render("pages/index", { products: products });
    }
};

// CRUCIAL: Si no exportas el objeto, router.get('/', productController.getIndex) dará error
module.exports = productController;