const productsService = require('../services/productsService');
const normalizeId = require('../utils/normalizeId');

const productController = {
    
    // 1. GET /api/products (Antes: getIndex)
    getAll: (req, res) => {
        try {
            let orden = req.query.sort;
            let productosOrdenados = productsService.getSorted(orden);
            let mostWanted = productsService.getMostWanted();

            // Estado Exitoso: 200 OK
            res.status(200).json({
                products: productosOrdenados,
                mostWanted: mostWanted 
            });
        } catch (error) {
            res.status(500).json({ error: "Error interno al obtener los productos" });
        }
    },

    // 2. GET /api/products/:id (Antes: getProductById)
    getById: (req, res) => {
        try {
            const { id: idValidado, status } = normalizeId(req.params.id);

            // Validación estricta de la US: Si el ID falla o no se encuentra
            if (status) {
                return res.status(404).json({ "error": "Producto no encontrado" });
            }

            const productoEncontrado = productsService.getById(idValidado);
            
            if (!productoEncontrado) {
                return res.status(404).json({ "error": "Producto no encontrado" });
            }

            const relacionados = productsService.getRelated(productoEncontrado);

            // Estado Exitoso: 200 OK
            res.status(200).json({
                product: productoEncontrado,
                relacionados: relacionados
            });
        } catch (error) {
            res.status(500).json({ error: "Error interno al obtener el producto" });
        }
    },

    // 3. POST /api/products
    create: (req, res) => {
        try {
            const newProductData = req.body;
            const createdProduct = productsService.create(newProductData);

            // Estado Exitoso: 201 Created
            res.status(201).json(createdProduct);
        } catch (error) {
            res.status(500).json({ error: "Error interno al crear el producto" });
        }
    },

    // 4. PUT /api/products/:id
    update: (req, res) => {
        try {
            const { id: idValidado, status } = normalizeId(req.params.id);
            
            if (status) {
                return res.status(404).json({ "error": "Producto no encontrado" });
            }

            const updateData = req.body;
            const updatedProduct = productsService.update(idValidado, updateData);

            if (!updatedProduct) {
                return res.status(404).json({ "error": "Producto no encontrado" });
            }

            // Estado Exitoso: 200 OK
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: "Error interno al actualizar el producto" });
        }
    },

    // 5. DELETE /api/products/:id
    delete: (req, res) => {
        try {
            const { id: idValidado, status } = normalizeId(req.params.id);
            
            if (status) {
                return res.status(404).json({ "error": "Producto no encontrado" });
            }
            
            const wasDeleted = productsService.delete(idValidado);

            if (!wasDeleted) {
                return res.status(404).json({ "error": "Producto no encontrado" });
            }

            // Estado Exitoso: 200 OK
            res.status(200).json({ message: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error interno al eliminar el producto" });
        }
    },

    // --- RUTAS DE BÚSQUEDA Y CATEGORÍAS (Mantenidas de tu código anterior) ---
    
    getCategory: (req, res) => {
        try {
            const categoryName = req.params.category; 
            let orden = req.query.sort;
            let productosOrdenados = productsService.getCategorySorted(categoryName, orden);

            res.status(200).json({
                products: productosOrdenados,
                categoryName: categoryName
            });
        } catch (error) {
            res.status(500).json({ error: "Error interno al obtener la categoría" });
        }
    },

    search: (req, res) => {
        try {
            const searchWord = req.query.query;

            if (!searchWord) {
                return res.status(400).json({ error: "Debe proporcionar un término de búsqueda en la URL" });
            }

            const filteredProducts = productsService.searchByName(searchWord);

            res.status(200).json({
                products: filteredProducts,
                searchWord: searchWord
            });
        } catch (error) {
            res.status(500).json({ error: "Error interno en la búsqueda" });
        }
    }
};

module.exports = productController;