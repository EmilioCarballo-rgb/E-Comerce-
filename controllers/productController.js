const productsService = require('../services/productsService');

// FUNCIÓN DE LA STORY 17: Normaliza y valida el ID
const normalizeId = (id) => {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
        return null;
    }
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
        const idValidado = normalizeId(idParams);

        if (idValidado === null) {
            return res.status(400).render("pages/400");
        }

        const productoEncontrado = productsService.getById(idValidado);

        if (productoEncontrado) {
            let relacionados = productsService.getRelated(productoEncontrado);

            res.render("pages/products", { 
                product: productoEncontrado, 
                relacionados: relacionados 
            });
        } else {
            res.status(404).render("pages/404");
        }
    },

    // VISTA RESULTADOS DE BÚSQUEDA
    search: (req, res) => {
        const searchWord = req.query.query;

        if (!searchWord) {
            return res.redirect('/');
        }

        const filteredProducts = productsService.searchByName(searchWord);

        // Pasamos por defecto el cartCount en 0 (ajustalo si usás otra lógica para el carrito)
        res.render("pages/searchResults", {
            products: filteredProducts,
            searchWord: searchWord,
            cartCount: req.session?.cart?.length || 0 
        });
    }
};

module.exports = productController;