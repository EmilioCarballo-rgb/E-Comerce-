const productsService = require('../services/productsService'); 

const productsController = {
    index: (req, res) => {
        try {
            const orden = req.query.sort || ''; 
            const products = productsService.getSorted(orden); 
            const mostWanted = productsService.getMostWanted();
            
            return res.render('pages/index', { 
                products: products,
                mostWanted: mostWanted,
                title: 'Mateando 🧉 - Inicio'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error al cargar la página de inicio');
        }
    },

    detail: (req, res) => {
        try {
            const id = req.params.id;
            const product = productsService.getById(id);
            
            if (!product) {
                return res.status(404).render('pages/404'); 
            }

            const relacionados = productsService.getRelated(product);

            return res.render('pages/products', { 
                product: product,
                relacionados: relacionados
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error al cargar el producto');
        }
    }
};

module.exports = productsController;