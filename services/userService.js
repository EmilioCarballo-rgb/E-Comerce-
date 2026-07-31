// services/userService.js
const crypto = require('crypto');
const db = require('../db/database');

const KEYLEN = 64;

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, KEYLEN).toString('hex');
    return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
    const [salt, hash] = storedHash.split(':');
    const hashToCompare = crypto.scryptSync(password, salt, KEYLEN).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(hashToCompare, 'hex'));
}

const userService = {
    findByEmail: (email) => {
        return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    },

    create: (nombre, apellido, email, password) => {
        const name = `${nombre} ${apellido}`.trim();
        const passwordHash = hashPassword(password);

        const info = db.prepare(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
        ).run(name, email, passwordHash);

        return { id: info.lastInsertRowid, name, email };
    },

    verifyPassword
};

module.exports = userService;