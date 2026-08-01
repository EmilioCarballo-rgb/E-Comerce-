const productsService = require('../../services/productsService');

const productsApiController = {

    list: async (req, res) => {
        try {
            const products = await productsService.getAll();

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },


    detail: async (req, res) => {
        try {
            const product = await productsService.getById(req.params.id);
            

            if (!product) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: "Error al buscar el producto" });
        }
    },


    create: async (req, res) => {
        try {
            const newProduct = await productsService.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {

            console.error("🔥 Error real al guardar:", error); 
            
            res.status(500).json({ error: "Error al crear el producto" });
        }
    },

    update: async (req, res) => {
        try {
            const updatedProduct = await productsService.update(req.params.id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el producto" });
        }
    },


    destroy: async (req, res) => {
        try {
            await productsService.delete(req.params.id);

            res.status(200).json({ message: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el producto" });
        }
    }
};

module.exports = productsApiController;     