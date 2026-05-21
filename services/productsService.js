const db = require('../db/database'); // Traemos la conexión a la base de datos

const productsService = {
    // 1. Obtener todos los productos (con opción de ordenarlos)
    getSorted: (orden) => {
        let query = "SELECT * FROM products";
        if (orden === 'asc') {
            query += " ORDER BY price ASC";
        } else if (orden === 'desc') {
            query += " ORDER BY price DESC";
        }
        return db.prepare(query).all(); // .all() te devuelve un Array con todos los resultados
    },

    // 2. Obtener un producto por ID
    getById: (id) => {
        // .get() te devuelve un solo objeto (justo lo que necesitamos para el detalle)
        return db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    },

    // 3. Filtrar por categoría y ordenar
    getCategorySorted: (categoryName, orden) => {
        let query = "SELECT * FROM products WHERE category = ?";
        if (orden === 'asc') {
            query += " ORDER BY price ASC";
        } else if (orden === 'desc') {
            query += " ORDER BY price DESC";
        }
        return db.prepare(query).all(categoryName);
    },

    // 4. Buscar por nombre (NUEVO)
    searchByName: (nombreBuscado) => {
        // Usamos LIKE con los comodines % para que encuentre coincidencias parciales
        // Ej: si buscas "termo", te va a traer "Termo Stanley" o "Termo Media Manija"
        return db.prepare("SELECT * FROM products WHERE name LIKE ?").all(`%${nombreBuscado}%`);
    },

    // 5. Obtener los más pedidos / sugeridos
    getMostWanted: () => {
        // En SQLite los booleanos se guardan como 1 (true) y 0 (false)
        return db.prepare("SELECT * FROM products WHERE isMostWanted = 1 LIMIT 10").all();
    },

    // 6. Obtener productos relacionados
    getRelated: (producto) => {
        // Misma categoría, distinto ID. 
        // ¿Te acordás del choclo de Math.random() que teníamos antes? En SQL es una papa: ORDER BY RANDOM()
        return db.prepare("SELECT * FROM products WHERE category = ? AND id != ? ORDER BY RANDOM() LIMIT 4").all(producto.category, producto.id);
    }
};

module.exports = productsService;