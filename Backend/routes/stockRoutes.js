const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/', stockController.getAllStock);
router.get('/fruit/:id', stockController.getStockByFruitId);
router.put('/:id', stockController.updateStock);

module.exports = router;