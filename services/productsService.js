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

// Obtener productos relacionados (misma categoría, distinto ID)
    getRelated: (producto) => {
        // Si por algún motivo el producto no viene, devolvemos un array vacío
        if (!producto || !producto.category) return [];

        // Buscamos productos de la misma categoría, excluyendo el actual. 
        // Usamos LIMIT 4 para que la sección de relacionados no sea infinita.
        const stmt = db.prepare('SELECT * FROM products WHERE category = ? AND id != ? LIMIT 4');
        return stmt.all(producto.category, producto.id);
    },

    // Obtener la cantidad total de productos
    count: () => {
        const result = db.prepare('SELECT COUNT(*) as total FROM products').get();
        return result.total;
    },
    // --- NUEVOS MÉTODOS PARA EL PANEL DE ADMINISTRADOR ---

    // Obtener todos los productos (sin ordenar)
    getAll: () => {
        return db.prepare("SELECT * FROM products").all();
    },

    // Crear un nuevo producto
    create: (data) => {
        // Cambiamos "store" por "category" en la consulta SQL
        const stmt = db.prepare('INSERT INTO products (name, price, stock, description, category, image) VALUES (?, ?, ?, ?, ?, ?)');
        
        // Usamos data.store (o data.category por las dudas) para que coincida con lo que manda React
        const categoryValue = data.store || data.category || '';
        
        const info = stmt.run(data.name, data.price, data.stock, data.description, categoryValue, data.image);
        return { id: info.lastInsertRowid, ...data };
    },

    // Actualizar un producto existente
    update: (id, data) => {
        // Cambiamos "store" por "category" acá también
        const stmt = db.prepare('UPDATE products SET name = ?, price = ?, stock = ?, description = ?, category = ?, image = ? WHERE id = ?');
        
        const categoryValue = data.store || data.category || '';
        
        stmt.run(data.name, data.price, data.stock, data.description, categoryValue, data.image, id);
        return { id, ...data };
    },

    // Eliminar un producto
    delete: (id) => {
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        stmt.run(id);
        return true;
    }
};

module.exports = productsService;