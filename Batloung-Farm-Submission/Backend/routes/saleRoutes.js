const express = require('express');
const router = express.Router();

const saleController = require('../controllers/saleController');

router.post('/', saleController.addSale);
router.get('/', saleController.getAllSales);
router.post('/:id/payment', saleController.recordPayment);
router.get('/:id', saleController.getSaleById);
router.put('/:id', saleController.updateSale);
router.delete('/:id', saleController.deleteSale);

module.exports = router;