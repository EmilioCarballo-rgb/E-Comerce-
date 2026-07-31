const productsService = require('../../services/productsService');

const productsApiController = {
    // 1. Listar todos los productos
    list: async (req, res) => {
        try {
            const products = await productsService.getAll();
            // Estado 200 y JSON con la lista
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // 2. Detalle de un producto específico
    detail: async (req, res) => {
        try {
            const product = await productsService.getById(req.params.id);
            
            // Validación requerida: Si no existe, devolver 404 con mensaje específico
            if (!product) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: "Error al buscar el producto" });
        }
    },

    // 3. Crear producto
    create: async (req, res) => {
        try {
            const newProduct = await productsService.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            // AGREGAMOS ESTA LÍNEA PARA VER EL ERROR EN LA TERMINAL:
            console.error("🔥 Error real al guardar:", error); 
            
            res.status(500).json({ error: "Error al crear el producto" });
        }
    },
    // 4. Actualizar producto
    update: async (req, res) => {
        try {
            const updatedProduct = await productsService.update(req.params.id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el producto" });
        }
    },

    // 5. Eliminar producto
    destroy: async (req, res) => {
        try {
            await productsService.delete(req.params.id);
            // Podemos devolver 200 OK con un mensaje de éxito, o 204 No Content
            res.status(200).json({ message: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el producto" });
        }
    }
};

module.exports = productsApiController;     