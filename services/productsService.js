// services/productsService.js
const db = require('../db/database'); // Importamos la conexión SQLite

const productsService = {
    // 1. Busca por ID
    getById: (id) => {
        // .get() nos devuelve un único objeto, perfecto para un producto por ID
        return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    },

    // 2. Devuelve todos ordenados
    getSorted: (orden) => {
        const direction = orden === 'desc' ? 'DESC' : 'ASC';
        return db.prepare(`SELECT * FROM products ORDER BY price ${direction}`).all();
    },

    // 3. Devuelve los más pedidos
    getMostWanted: () => {
        // Obtenemos los marcados como 'isMostWanted'
        const mostWanted = db.prepare('SELECT * FROM products WHERE isMostWanted = 1 LIMIT 10').all();
        
        // Si no hay 10, completamos con productos aleatorios (fall-back logic)
        if (mostWanted.length < 10) {
            const missingCount = 10 - mostWanted.length;
            const randomProducts = db.prepare('SELECT * FROM products WHERE isMostWanted = 0 ORDER BY RANDOM() LIMIT ?').all(missingCount);
            return [...mostWanted, ...randomProducts];
        }
        return mostWanted;
    },

    // 4. Devuelve por categoría ordenados
    getCategorySorted: (categoryName, orden) => {
        const direction = orden === 'desc' ? 'DESC' : 'ASC';
        return db.prepare(`SELECT * FROM products WHERE category = ? ORDER BY price ${direction}`).all(categoryName);
    },

    // 5. Devuelve productos relacionados
    getRelated: (product) => {
        return db.prepare('SELECT * FROM products WHERE category = ? AND id != ? ORDER BY RANDOM() LIMIT 4')
                 .all(product.category, product.id);
    },

    // 6. Búsqueda por nombre
    searchByName: (query) => {
        if (!query) return [];
        // LIKE %?% permite buscar coincidencias parciales en el nombre
        return db.prepare('SELECT * FROM products WHERE name LIKE ?').all(`%${query}%`);
    }
};

module.exports = productsService;