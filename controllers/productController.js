const Product = require ('../models/products');

const productController = {
    //Lista todos los productos  (home)
    getIndex: (req, res) => {const allProducts = Product.findAll();
        res.render ("pages/index", {products: allProducts});
    },

    //Detalle de un producto 
    getDetail: (req, res) => {const product = Product.findById(req.params.id) 
        if(product){
            res.render("pages/products", {products:product});
        } else {
            res.status(404).send("Producto no encontrado")
        }
    },

    //Filtrado por categoria 
    getByCategory: (req, res) => {const filtered = Product.findByCategory (req.params.CategoriaId);
        res.render("pages/index", {products: filtered});
    }
};

module.exports = productController;