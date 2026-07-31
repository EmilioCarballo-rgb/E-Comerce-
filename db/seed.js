const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const db = new Database(path.join(__dirname, 'ecommerce.db'));

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema);

console.log("¡Éxito! La base de datos fue creada y poblada correctamente.");