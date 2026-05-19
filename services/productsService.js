// Importá tu modelo de Producto (ajustá la ruta si está en otro lado)
const Product = require('../models/Product'); 

const productsService = {
    // 1. Busca por ID
    getById: (id) => {
        return Product.findById(id);
    },

    // 2. Devuelve todos ordenados (Para el Index)
    getSorted: (orden) => {
        let allProducts = Product.findAll(); 
        let productosOrdenados = [...allProducts];

        if (orden === 'asc') {
            productosOrdenados.sort((a, b) => a.price - b.price);
        } else if (orden === 'desc') {
            productosOrdenados.sort((a, b) => b.price - a.price);
        }
        return productosOrdenados;
    },

    // 3. Devuelve los más pedidos mezclados
    getMostWanted: () => {
        let allProducts = Product.findAll();
        let mostWanted = allProducts.filter(p => p.isMostWanted === true);
        
        if (mostWanted.length < 10) {
            let otherProducts = allProducts.filter(p => !p.isMostWanted);
            otherProducts.sort(() => 0.5 - Math.random());
            mostWanted = [...mostWanted, ...otherProducts].slice(0, 10);
        } else {
            mostWanted = mostWanted.slice(0, 10);
        }
        return mostWanted;
    },

    // 4. Devuelve por categoría ordenados
   getCategorySorted: (categoryName, orden) => {
        // Obtenemos todos y filtramos
        let allProducts = Product.findAll();
        let filteredProducts = allProducts.filter(p => p.category === categoryName);
        
        let productosOrdenados = [...filteredProducts];

        if (orden === 'asc') {
            productosOrdenados.sort((a, b) => a.price - b.price);
        } else if (orden === 'desc') {
            productosOrdenados.sort((a, b) => b.price - a.price);
        }

        return productosOrdenados;
    },

    // 5. Devuelve productos relacionados al azar
    getRelated: (productoEncontrado) => {
        let relacionados = Product.findAll().filter(p => 
            p.category === productoEncontrado.category && p.id !== productoEncontrado.id
        );

        if (relacionados.length > 4) {
            relacionados = relacionados.sort(() => 0.5 - Math.random()).slice(0, 4);
        }
        return relacionados;
    }
};

module.exports = productsService;