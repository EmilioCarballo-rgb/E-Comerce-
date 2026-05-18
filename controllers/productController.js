
const Product = require('../models/Product'); 

const productController = {
    
    // VISTA HOME: Los más pedidos y Catálogo general
    getIndex: (req, res) => {
        let allProducts = Product.findAll(); 
        
        // Copiamos el array para no sobreescribir los datos originales
        let productosOrdenados = [...allProducts];
        let orden = req.query.sort;

        // LÓGICA CORREGIDA: Usamos "price" en inglés (¡Acá estaba el error!)
        if (orden === 'asc') {
            productosOrdenados.sort((a, b) => a.price - b.price);
        } else if (orden === 'desc') {
            productosOrdenados.sort((a, b) => b.price - a.price);
        }

        // Lógica de productos más pedidos
        let mostWanted = allProducts.filter(p => p.isMostWanted === true);
        if (mostWanted.length < 10) {
            let otherProducts = allProducts.filter(p => !p.isMostWanted);
            otherProducts.sort(() => 0.5 - Math.random());
            mostWanted = [...mostWanted, ...otherProducts].slice(0, 10);
        } else {
            mostWanted = mostWanted.slice(0, 10);
        }

        res.render("pages/index", { 
            products: productosOrdenados, 
            mostWanted: mostWanted 
        });
    },

    // VISTA POR CATEGORÍA
    getCategory: (req, res) => {
        const categoryName = req.params.category; 
        
        let filteredProducts = Product.findAll().filter(p => p.category === categoryName);
        let productosOrdenados = [...filteredProducts];
        let orden = req.query.sort;

        // LÓGICA CORREGIDA: Usamos "price" en inglés
        if (orden === 'asc') {
            productosOrdenados.sort((a, b) => a.price - b.price);
        } else if (orden === 'desc') {
            productosOrdenados.sort((a, b) => b.price - a.price);
        }

        res.render("pages/category", { 
            products: productosOrdenados, 
            categoryName: categoryName 
        });
    },

    // VISTA DETALLE + RELACIONADOS 
    getProductById: (req, res) => {
        const idSeleccionado = req.params.id; 
        const productoEncontrado = Product.findById(idSeleccionado);

        if (productoEncontrado) {
            let relacionados = Product.findAll().filter(p => 
                p.category === productoEncontrado.category && p.id !== productoEncontrado.id
            );

            if (relacionados.length > 4) {
                relacionados = relacionados.sort(() => 0.5 - Math.random()).slice(0, 4);
            }

            res.render("pages/products", { 
                product: productoEncontrado, 
                relacionados: relacionados 
            });
        } else {
            res.status(404).render("pages/404");
        }
    }
};

module.exports = productController;