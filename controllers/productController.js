// controllers/productController.js
const Product = require('../models/Product'); 

const productController = {
    
    // VISTA HOME: Los más pedidos 
    getIndex: (req, res) => {
        let allProducts = Product.findAll(); 
        let mostWanted = allProducts.filter(p => p.isMostWanted === true);
        
        if (mostWanted.length < 10) {
            let otherProducts = allProducts.filter(p => !p.isMostWanted);
            otherProducts.sort(() => 0.5 - Math.random());
            mostWanted = [...mostWanted, ...otherProducts].slice(0, 10);
        } else {
            mostWanted = mostWanted.slice(0, 10);
        }

        res.render("pages/index", { 
            products: allProducts, 
            mostWanted: mostWanted 
        });
    },

    // VISTA POR CATEGORÍA
    getCategory: (req, res) => {
        const categoriaElegida = req.params.categoriaId;
        const productosFiltrados = Product.findByCategory(categoriaElegida);
        res.render("pages/index", { 
            products: productosFiltrados, 
            mostWanted: [] 
        });
    },

    // VISTA DETALLE + RELACIONADOS 
    getProductById: (req, res) => {
        const idSeleccionado = req.params.id; 
        const productoEncontrado = Product.findById(idSeleccionado);

        if (productoEncontrado) {
            // Lógica de Productos Relacionados (mismo rubro, distinto ID)
            let relacionados = Product.findAll().filter(p => 
                p.category === productoEncontrado.category && p.id !== productoEncontrado.id
            );

            // Seleccionamos máximo 4 al azar si hay muchos
            if (relacionados.length > 4) {
                relacionados = relacionados.sort(() => 0.5 - Math.random()).slice(0, 4);
            }

            res.render("pages/products", { 
                product: productoEncontrado, 
                relacionados: relacionados 
            });
        } else {
            // Escenario 2: El producto no existe -> 404
            res.status(404).render("pages/404");
        }
    }
};

module.exports = productController;