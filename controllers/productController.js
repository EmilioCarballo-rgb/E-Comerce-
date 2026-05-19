const productsService = require('../services/productsService');

// FUNCIÓN DE LA STORY 17: Normaliza y valida el ID
const normalizeId = (id) => {
    // Intentamos convertir lo que llegue en la URL a un Número real
    const parsedId = Number(id);
    
    // Si no es un número (isNaN = is Not a Number), devolvemos null
    if (isNaN(parsedId)) {
        return null;
    }
    
    // Si está todo bien, devolvemos el número limpio
    return parsedId;
};


const productController = {
    
    // VISTA HOME: Los más pedidos y Catálogo general
    getIndex: (req, res) => {
        let orden = req.query.sort;
        let productosOrdenados = productsService.getSorted(orden);
        let mostWanted = productsService.getMostWanted();

        res.render("pages/index", { 
            products: productosOrdenados, 
            mostWanted: mostWanted 
        });
    },

    // VISTA POR CATEGORÍA
    getCategory: (req, res) => {
        const categoryName = req.params.category; 
        let orden = req.query.sort;

        let productosOrdenados = productsService.getCategorySorted(categoryName, orden);

        res.render("pages/category", { 
            products: productosOrdenados, 
            categoryName: categoryName 
        });
    },

    // VISTA DETALLE + RELACIONADOS (MODIFICADO STORY 17)
    getProductById: (req, res) => {
        const idParams = req.params.id; 
        
        // 1. Pasamos el ID por nuestro "patovica" (normalizeId)
        const idValidado = normalizeId(idParams);

        // ESCENARIO 1: El ID no es numérico (ej: /products/hola) -> ERROR 400
        if (idValidado === null) {
            return res.status(400).render("pages/400");
        }

        // 2. Si pasó la validación, buscamos el producto
        const productoEncontrado = productsService.getById(idValidado);

        if (productoEncontrado) {
            // Si existe, mostramos la página normal
            let relacionados = productsService.getRelated(productoEncontrado);

            res.render("pages/products", { 
                product: productoEncontrado, 
                relacionados: relacionados 
            });
        } else {
            // ESCENARIO 2: Es numérico pero no existe (ej: /products/9999) -> ERROR 404
            res.status(404).render("pages/404");
        }
    }
};

module.exports = productController;