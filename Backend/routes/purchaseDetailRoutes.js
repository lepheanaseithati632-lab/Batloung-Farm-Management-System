const express = require('express');
const router = express.Router();

const purchaseDetailController = require('../controllers/purchaseDetailController');

router.post('/', purchaseDetailController.addPurchaseDetail);
router.get('/', purchaseDetailController.getAllPurchaseDetails);
router.get('/purchase/:id', purchaseDetailController.getPurchaseDetailsById);
router.delete('/:id', purchaseDetailController.deletePurchaseDetail);

module.exports = router;