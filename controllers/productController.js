const productsService = require('../services/productsService');
const normalizeId = require('../utils/normalizeId');

const productController = {
    
    // API HOME: Los más pedidos y Catálogo general
    getIndex: (req, res) => {
        let orden = req.query.sort;
        let productosOrdenados = productsService.getSorted(orden);
        let mostWanted = productsService.getMostWanted();

        // ANTES: res.render(...)
        // AHORA: Devolvemos un JSON con estado 200 (OK)
        res.status(200).json({
            success: true,
            data: {
                products: productosOrdenados,
                mostWanted: mostWanted 
            }
        });
    },

    // API POR CATEGORÍA
    getCategory: (req, res) => {
        const categoryName = req.params.category; 
        let orden = req.query.sort;

        let productosOrdenados = productsService.getCategorySorted(categoryName, orden);

        res.status(200).json({
            success: true,
            data: {
                products: productosOrdenados,
                categoryName: categoryName
            }
        });
    },

    // API DETALLE + RELACIONADOS
    getProductById: (req, res) => {
        const { id: idValidado, status } = normalizeId(req.params.id);

        if (status) {
            // ANTES: res.status(status).render(`pages/${status}`);
            // AHORA: Enviamos el código de error (ej. 404) como JSON
            return res.status(status).json({ 
                success: false, 
                message: `Error ${status}: Producto no encontrado o ID inválido` 
            });
        }

        const productoEncontrado = productsService.getById(idValidado);
        const relacionados = productsService.getRelated(productoEncontrado);

        res.status(200).json({
            success: true,
            data: {
                product: productoEncontrado,
                relacionados: relacionados
            }
        });
    },

    // API RESULTADOS DE BÚSQUEDA
    search: (req, res) => {
        const searchWord = req.query.query;

        if (!searchWord) {
            // ANTES: return res.redirect('/');
            // AHORA: Enviamos un error 400 (Bad Request) si no hay término de búsqueda
            return res.status(400).json({ 
                success: false, 
                message: "Debe proporcionar un término de búsqueda en la URL (ej: ?query=remera)" 
            });
        }

        const filteredProducts = productsService.searchByName(searchWord);

        // Ya no hace falta mandar el cartCount desde aquí, eso lo manejará React internamente
        res.status(200).json({
            success: true,
            data: {
                products: filteredProducts,
                searchWord: searchWord
            }
        });
    }
};

module.exports = productController;