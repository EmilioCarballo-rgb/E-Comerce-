// db/migrate.js
const path = require('path');
const db = require(path.resolve(__dirname, 'database.js'));
const Product = require('../models/Product'); // Importamos tu modelo

// Obtenemos los productos de tu modelo
// (Asegurate que Product.js exporte el array o tenga un método para obtenerlos)
const products = Product.findAll ? Product.findAll() : Product.products; 

console.log(`🚀 Iniciando migración de ${products.length} productos...`);

// Preparamos la inserción
const insert = db.prepare(`
    INSERT OR IGNORE INTO products (name, price, category, image, description, isMostWanted, stock)
    VALUES (@name, @price, @category, @image, @description, @isMostWanted, @stock)
`);

// Ejecutamos la migración
const transaction = db.transaction((products) => {
    for (const product of products) {
        insert.run({
            name: product.title || product.name, // Ajustamos si el modelo usa 'title'
            price: product.price,
            category: product.category,
            image: product.image || '',
            description: product.description || '',
            isMostWanted: product.isMostWanted ? 1 : 0,
            stock: product.stock || 0
        });
    }
});

transaction(products);
console.log('✅ Migración completada con éxito.');