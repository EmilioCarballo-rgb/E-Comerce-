
const db = require('../db/database'); // Asegúrate de que esta ruta apunte a tu conexión de base de datos

const categoryService = {
    // Obtener todas las categorías
    getAll: () => {
        return db.prepare('SELECT * FROM categories').all();
    },
    // Obtener la cantidad total de categorías
    count: () => {
        const result = db.prepare('SELECT COUNT(*) as total FROM categories').get();
        return result.total;
    },

    // Obtener una categoría por su ID
    getById: (id) => {
        return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    },

    // Crear una nueva categoría
    create: (categoryData) => {
        // Ajusta "name" y "description" según las columnas exactas de tu tabla en SQLite
        const stmt = db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)');
        const info = stmt.run(categoryData.name, categoryData.description);
        
        // Devolvemos el objeto creado junto con el nuevo ID generado por SQLite
        return { id: info.lastInsertRowid, ...categoryData };
    },

    // Modificar una categoría existente
    update: (id, categoryData) => {
        const stmt = db.prepare('UPDATE categories SET name = ?, description = ? WHERE id = ?');
        const info = stmt.run(categoryData.name, categoryData.description, id);
        
        // info.changes nos dice cuántas filas se modificaron. Si es 0, el ID no existía.
        if (info.changes === 0) return null;
        
        return { id, ...categoryData };
    },

    // Eliminar una categoría
    delete: (id) => {
        const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
        const info = stmt.run(id);
        
        // Si se eliminó al menos 1 fila, devuelve true (éxito)
        return info.changes > 0;
    }
};

module.exports = categoryService;