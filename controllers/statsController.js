const productsService = require('../services/productsService');
const categoryService = require('../services/categoryService');

const statsController = {
    getGeneralStats: (req, res) => {
        try {
            // Obtenemos los totales desde SQLite
            const totalProducts = productsService.count();
            const totalCategories = categoryService.count();

            // Retornamos el JSON con la estructura exacta de la validación
            res.status(200).json({
                totalProducts: totalProducts,
                totalCategories: totalCategories
            });
        } catch (error) {
            res.status(500).json({ error: "Error interno al calcular las métricas" });
        }
    }
};

module.exports = statsController;