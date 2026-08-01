const db = require('../db/database'); 

const categoryService = {

    getAll: () => {
        return db.prepare('SELECT * FROM categories').all();
    },


    getById: (id) => {
        return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    },


    create: (category) => {
        const result = db.prepare('INSERT INTO categories (name) VALUES (?)').run(category.name);
        return { id: result.lastInsertRowid, ...category };
    },


    update: (id, category) => {
        db.prepare('UPDATE categories SET name = ? WHERE id = ?').run(category.name, id);
        return { id, ...category };
    },


    delete: (id) => {
        db.prepare('DELETE FROM categories WHERE id = ?').run(id);
        return { success: true };
    },


    count: () => {
        const result = db.prepare('SELECT COUNT(*) as total FROM categories').get();
        return result.total;
    }
};

module.exports = categoryService;