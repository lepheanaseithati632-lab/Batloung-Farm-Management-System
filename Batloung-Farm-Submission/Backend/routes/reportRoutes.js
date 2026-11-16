const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');

// Sales summary
router.get('/sales-summary', reportController.getSalesSummary);

// Most sold fruits
router.get('/most-sold-fruits', reportController.getMostSoldFruits);

// Top vendors
router.get('/top-vendors', reportController.getTopVendors);

// Current stock
router.get('/stock', reportController.getStockReport);

module.exports = router;