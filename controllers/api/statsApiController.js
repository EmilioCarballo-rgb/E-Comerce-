const productsService = require('../../services/productsService');
const categoryService = require('../../services/categoryService');

const statsApiController = {
    getStats: async (req, res) => {
        try {
            // Obtenemos los totales de forma segura
            const totalProducts = typeof productsService.count === 'function' ? productsService.count() : 0;
            const totalCategories = typeof categoryService.count === 'function' ? categoryService.count() : 0;

            res.status(200).json({
                totalProducts: totalProducts,
                totalCategories: totalCategories
            });
        } catch (error) {
        console.error("🔥 ERROR REAL EN STATS:", error); // <--- CAMBIÁ ESTO
        res.status(500).json({ error: error.message });   // <--- Y ESTO PARA QUE LO MUESTRE EN EL NAVEGADOR
    }
    }
};

module.exports = statsApiController;
