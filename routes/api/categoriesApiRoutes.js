const express = require('express');
const router = express.Router();

const categoriesApiController = require('../../controllers/api/categoriesApiController');

// GET /api/categories
router.get('/', categoriesApiController.list);

// GET /api/categories/:id
router.get('/:id', categoriesApiController.detail);

// POST /api/categories
router.post('/', categoriesApiController.create);

// PUT /api/categories/:id
router.put('/:id', categoriesApiController.update);

// DELETE /api/categories/:id
router.delete('/:id', categoriesApiController.destroy);

module.exports = router;