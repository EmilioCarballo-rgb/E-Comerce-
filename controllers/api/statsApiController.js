const productsService = require('../../services/productsService');
const categoryService = require('../../services/categoryService');

const statsApiController = {
    getStats: async (req, res) => {
        try {

            const totalProducts = typeof productsService.count === 'function' ? productsService.count() : 0;
            const totalCategories = typeof categoryService.count === 'function' ? categoryService.count() : 0;

            res.status(200).json({
                totalProducts: totalProducts,
                totalCategories: totalCategories
            });
        } catch (error) {
        console.error("🔥 ERROR REAL EN STATS:", error); 
        res.status(500).json({ error: error.message });
    }
    }
};

module.exports = statsApiController;
