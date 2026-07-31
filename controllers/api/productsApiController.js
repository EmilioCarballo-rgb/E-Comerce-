const productsService = require('../../services/productsService'); // Ajusta la ruta

const productsApiController = {
    // Listar todos los productos (Para el listado en React)
    list: (req, res) => {
        try {
            // Podemos capturar query strings de la URL si el React pide ordenamiento
            // Ejemplo: /api/products?orden=asc
            const orden = req.query.orden || ''; 
            
            // Llamamos a TU servicio
            const products = productsService.getSorted(orden);
            
            // Requisito del Sprint: Devolver JSON y Status 200 (OK)
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: productsService.count(), // Usamos tu método count()
                    url: '/api/products'
                },
                data: products
            });
        } catch (error) {
            console.error(error);
            // Requisito del Sprint: Status 500 (Internal Server Error)
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Detalle de un producto (Para editar en React)
    detail: (req, res) => {
        try {
            const id = req.params.id;
            const product = productsService.getById(id); // Llamamos a TU servicio

            if (!product) {
                // Requisito del Sprint: Status 404 (Not Found)
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            return res.status(200).json({
                meta: { status: 200, url: `/api/products/${id}` },
                data: product
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = productsApiController;