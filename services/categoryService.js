const db = require('../db/database'); 

const categoryService = {
    // 1. Traer TODAS las categorías (ahora trae ID y name)
    getAll: () => {
        return db.prepare('SELECT * FROM categories').all();
    },

    // 2. Traer UNA categoría específica para editarla
    getById: (id) => {
        return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    },

    // 3. Crear una NUEVA categoría
    create: (category) => {
        const result = db.prepare('INSERT INTO categories (name) VALUES (?)').run(category.name);
        return { id: result.lastInsertRowid, ...category };
    },

    // 4. Modificar una categoría existente
    update: (id, category) => {
        db.prepare('UPDATE categories SET name = ? WHERE id = ?').run(category.name, id);
        return { id, ...category };
    },

    // 5. Eliminar una categoría
    delete: (id) => {
        db.prepare('DELETE FROM categories WHERE id = ?').run(id);
        return { success: true };
    },

    // 6. Contar cuántas hay (para el panel de inicio)
    count: () => {
        const result = db.prepare('SELECT COUNT(*) as total FROM categories').get();
        return result.total;
    }
};

module.exports = categoryService;