
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.get('/', cartController.viewCart);
router.get('/checkout', cartController.renderCheckout);

router.get('/add/:id', cartController.add);
router.get('/increase/:id', cartController.increase);
router.get('/decrease/:id', cartController.decrease);
router.get('/remove/:id', cartController.remove);
router.get('/empty', cartController.empty);

router.post('/procesar-pago', cartController.procesarPago);

module.exports = router;