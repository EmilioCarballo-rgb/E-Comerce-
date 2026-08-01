const express = require('express');
const router = express.Router();

const categoriesApiController = require('../../controllers/api/categoriesApiController');


router.get('/', categoriesApiController.list);


router.get('/:id', categoriesApiController.detail);


router.post('/', categoriesApiController.create);


router.put('/:id', categoriesApiController.update);


router.delete('/:id', categoriesApiController.destroy);

module.exports = router;