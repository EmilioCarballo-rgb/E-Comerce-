// db/database.js
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// 1. Decimos dónde se va a guardar el archivito de la base de datos
const dbPath = path.resolve(__dirname, 'ecommerce.db');

// 2. Conectamos a SQLite (si el archivo ecommerce.db no existe, lo crea automáticamente)
const db = new Database(dbPath, { verbose: console.log });

// 3. Leemos tu archivo schema.sql
const schemaPath = path.resolve(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// 4. Ejecutamos el schema para asegurarnos de que las tablas existan
db.exec(schema);

console.log('✅ Base de datos SQLite inicializada correctamente.');

// Exportamos la conexión para poder usarla en el resto del proyecto
module.exports = db;