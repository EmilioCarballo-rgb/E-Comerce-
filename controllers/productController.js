// Importamos los datos 
const Product = require('../models/Product'); 

const productController = {
    // Esta es la función que busca tu archivo de rutas en la línea 7
    getIndex: (req, res) => {
        // Renderiza la vista 'index' pasando el array de productos
        res.render("pages/index", { products: Product});
    },

    getCategory: (req, res) => {
        const categoriaElegida = req.params.categoriaId;
        const productosFiltrados = Product.filter(p => p.category === categoriaElegida);
        
        res.render("pages/index", { products: productosFiltrados });
    },

    getProductById: (req, res) => {
        const idSeleccionado = parseInt(req.params.id); 
        // Asumiendo que Product es un arreglo o tiene un método find
        const productoEncontrado = Product.find(p => p.id === idSeleccionado);

        if (productoEncontrado) {
            res.render("pages/products", { products: productoEncontrado });
        } else {
            // Si el ID no existe (ej. /products/999), disparamos tu nueva vista 404
            res.status(404).render("pages/404");
        }
    }
};

module.exports = productController;