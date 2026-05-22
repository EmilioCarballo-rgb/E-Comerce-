const productsService = require('../services/productsService');

const normalizeId = (id) => {
    const parsedId = Number(id);
    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        return { id: null, status: 400 };
    }
    if (!productsService.getById(parsedId)) {
        return { id: null, status: 404 };
    }
    return { id: parsedId, status: null };
};

module.exports = normalizeId;
