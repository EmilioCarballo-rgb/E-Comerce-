// db/database.js
const Database = require('better-sqlite3');
const path = require('path');

// 1. Decimos dónde se va a guardar el archivito
const dbPath = path.resolve(__dirname, 'ecommerce.db');

// 2. Conectamos a SQLite
const db = new Database(dbPath, { verbose: console.log });

console.log('✅ Conexión a SQLite establecida.');

// Exportamos la conexión
module.exports = db;