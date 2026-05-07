// Importamos los datos 
const Product = require('../models/Product'); 

const productController = {
    
    getIndex: (req, res) => {
        // 1. Creamos los productos sugeridos (Bonus: 5 aleatorios)
        const sugeridos = [...Product].sort(() => 0.5 - Math.random()).slice(0, 5);

        // 2. Renderizamos mandando AMBOS listados
        res.render("pages/index", { 
            products: Product, 
            suggested: sugeridos 
        });
    },

    getCategory: (req, res) => {
          const categoriaElegida = req.params.categoriaId;
          const productosFiltrados = Product.filter(p => p.category === categoriaElegida);
    
             // Definimos sugeridos UNA SOLA VEZ
          const sugeridos = [...Product].sort(() => 0.5 - Math.random()).slice(0, 5);

             res.render("pages/index", { 
                 products: productosFiltrados, 
                 suggested: sugeridos // Usamos la variable de arriba
    });
},

    getProductById: (req, res) => {
        const idSeleccionado = parseInt(req.params.id); 
        // Asumiendo que Product es un arreglo o tiene un método find
        const productoEncontrado = Product.find(p => p.id === idSeleccionado);

        if (productoEncontrado) {
            res.render("pages/products", { products: productoEncontrado });
        } else {
            // Si el ID no existe (ej. /products/999), disparamos tu nueva vista 404
            res.status(404).render("pages/404");
        }
    }
};

module.exports = productController;