const express = require('express');
const router = express.Router();

const salesDetailController = require('../controllers/salesDetailController');

router.post('/', salesDetailController.addSalesDetail);
router.get('/', salesDetailController.getAllSalesDetails);
router.get('/sale/:id', salesDetailController.getSalesDetailsBySaleId);
router.delete('/:id', salesDetailController.deleteSalesDetail);

module.exports = router;