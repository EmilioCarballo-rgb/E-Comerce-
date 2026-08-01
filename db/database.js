
const Database = require('better-sqlite3');
const path = require('path');


const dbPath = path.resolve(__dirname, 'ecommerce.db');


const db = new Database(dbPath, { verbose: console.log });

console.log('✅ Conexión a SQLite establecida.');


module.exports = db;