const express = require('express');
const router = express.Router();


const productsApiController = require('../../controllers/api/productsApiController');


router.get('/', productsApiController.list);


router.get('/:id', productsApiController.detail);


router.post('/', productsApiController.create);


router.put('/:id', productsApiController.update);


router.delete('/:id', productsApiController.destroy);

module.exports = router;