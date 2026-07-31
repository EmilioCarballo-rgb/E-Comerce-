
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/register', userController.getRegister);
router.post('/register', userController.processRegister);

router.get('/login', userController.getLogin);
router.post('/login', userController.processLogin);

module.exports = router;