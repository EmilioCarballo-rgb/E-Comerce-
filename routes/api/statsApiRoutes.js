const express = require('express');
const router = express.Router();

const statsApiController = require('../../controllers/api/statsApiController');

// Ruta: GET /api/stats
router.get('/', statsApiController.getStats);

module.exports = router;