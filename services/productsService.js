const db = require('../db/database'); // Traemos la conexión a la base de datos

const productsService = {

    getSorted: (orden) => {
        let query = "SELECT * FROM products";
        if (orden === 'asc') {
            query += " ORDER BY price ASC";
        } else if (orden === 'desc') {
            query += " ORDER BY price DESC";
        }
        return db.prepare(query).all(); // .all() te devuelve un Array con todos los resultados
    },


    getById: (id) => {

        return db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    },


    getCategorySorted: (categoryName, orden) => {
        let query = "SELECT * FROM products WHERE category = ?";
        if (orden === 'asc') {
            query += " ORDER BY price ASC";
        } else if (orden === 'desc') {
            query += " ORDER BY price DESC";
        }
        return db.prepare(query).all(categoryName);
    },


    searchByName: (nombreBuscado) => {


        return db.prepare("SELECT * FROM products WHERE name LIKE ?").all(`%${nombreBuscado}%`);
    },


    getMostWanted: () => {

        return db.prepare("SELECT * FROM products WHERE isMostWanted = 1 LIMIT 10").all();
    },


    getRelated: (producto) => {

        if (!producto || !producto.category) return [];



        const stmt = db.prepare('SELECT * FROM products WHERE category = ? AND id != ? LIMIT 4');
        return stmt.all(producto.category, producto.id);
    },


    count: () => {
        const result = db.prepare('SELECT COUNT(*) as total FROM products').get();
        return result.total;
    },



    getAll: () => {
        return db.prepare("SELECT * FROM products").all();
    },


    create: (data) => {

        const stmt = db.prepare('INSERT INTO products (name, price, stock, description, category, image) VALUES (?, ?, ?, ?, ?, ?)');
        

        const categoryValue = data.store || data.category || '';
        
        const info = stmt.run(data.name, data.price, data.stock, data.description, categoryValue, data.image);
        return { id: info.lastInsertRowid, ...data };
    },


    update: (id, data) => {

        const stmt = db.prepare('UPDATE products SET name = ?, price = ?, stock = ?, description = ?, category = ?, image = ? WHERE id = ?');
        
        const categoryValue = data.store || data.category || '';
        
        stmt.run(data.name, data.price, data.stock, data.description, categoryValue, data.image, id);
        return { id, ...data };
    },


    delete: (id) => {
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        stmt.run(id);
        return true;
    }
};

module.exports = productsService;