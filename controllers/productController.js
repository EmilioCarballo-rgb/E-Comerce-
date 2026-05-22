const productsService = require('../services/productsService');
const normalizeId = require('../utils/normalizeId');

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

    // VISTA DETALLE + RELACIONADOS
    getProductById: (req, res) => {
        const { id: idValidado, status } = normalizeId(req.params.id);

        if (status) {
            return res.status(status).render(`pages/${status}`);
        }

        const productoEncontrado = productsService.getById(idValidado);
        const relacionados = productsService.getRelated(productoEncontrado);

        res.render("pages/products", {
            product: productoEncontrado,
            relacionados: relacionados
        });
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