const categoryService = require('../../services/categoryService');

const categoriesApiController = {

    list: async (req, res) => {
        try {
            const categories = await categoryService.getAll();
            res.status(200).json(categories);
        } catch (error) {
            console.error("Error al listar categorías:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },


    detail: async (req, res) => {
        try {
            const category = await categoryService.getById(req.params.id);
            if (!category) {
                return res.status(404).json({ error: "Categoría no encontrada" });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error("Error al buscar categoría:", error);
            res.status(500).json({ error: "Error al buscar la categoría" });
        }
    },


    create: async (req, res) => {
        try {
            const newCategory = await categoryService.create(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            console.error("Error al crear categoría:", error);
            res.status(500).json({ error: "Error al crear la categoría" });
        }
    },


    update: async (req, res) => {
        try {
            const updatedCategory = await categoryService.update(req.params.id, req.body);
            res.status(200).json(updatedCategory);
        } catch (error) {
            console.error("Error al actualizar categoría:", error);
            res.status(500).json({ error: "Error al actualizar la categoría" });
        }
    },


    destroy: async (req, res) => {
        try {
            await categoryService.delete(req.params.id);
            res.status(200).json({ message: "Categoría eliminada correctamente" });
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
            res.status(500).json({ error: "Error al eliminar la categoría" });
        }
    }
};

module.exports = categoriesApiController;