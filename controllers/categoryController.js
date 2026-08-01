
const categoryService = require('../services/categoryService');


const productService = require('../services/productsService'); 

const categoryController = {
    

    getByCategoryName: (req, res) => {
        try {
            const categoryName = req.params.categoryName;
            

            const filteredProducts = productService.getCategorySorted(categoryName); 

            res.render('pages/category', { 
                categoryName: categoryName, 
                products: filteredProducts 
            });
        } catch (error) {
            console.error("Error en getByCategoryName:", error);
            res.status(500).send("Error al cargar la página de la categoría");
        }
    },






    getAll: (req, res) => {
        try {
            const categories = categoryService.getAll();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las categorías desde la base de datos" });
        }
    },


    getById: (req, res) => {
        try {
            const id = req.params.id;
            const category = categoryService.getById(id);

            if (!category) {
                return res.status(404).json({ error: "Categoría no encontrada" });
            }

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la categoría" });
        }
    },


    create: (req, res) => {
        try {
            const newCategoryData = req.body;
            const createdCategory = categoryService.create(newCategoryData);
            
            res.status(201).json(createdCategory);
        } catch (error) {
            res.status(500).json({ error: "Error al crear la categoría" });
        }
    },


    update: (req, res) => {
        try {
            const id = req.params.id;
            const updateData = req.body;

            const updatedCategory = categoryService.update(id, updateData);

            if (!updatedCategory) {
                return res.status(404).json({ error: "Categoría no encontrada para actualizar" });
            }

            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la categoría" });
        }
    },


    delete: (req, res) => {
        try {
            const id = req.params.id;
            const wasDeleted = categoryService.delete(id);

            if (!wasDeleted) {
                return res.status(404).json({ error: "Categoría no encontrada para eliminar" });
            }

            res.status(200).json({ message: "Categoría eliminada con éxito" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la categoría" });
        }
    }
};

module.exports = categoryController;