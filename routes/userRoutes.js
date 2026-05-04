// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de Registro
router.get('/register', userController.getRegister);
router.post('/register', userController.processRegister);

// Rutas de Login
router.get('/login', userController.getLogin);
router.post('/login', userController.processLogin);

module.exports = router;