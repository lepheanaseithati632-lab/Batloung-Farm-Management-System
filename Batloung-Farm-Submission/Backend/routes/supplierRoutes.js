
const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/supplierController');

// Register a supplier
router.post('/', supplierController.addSupplier);

// Get all suppliers
router.get('/', supplierController.getAllSuppliers);

// Get supplier by ID
router.get('/:id', supplierController.getSupplierById);

// Update supplier
router.put('/:id', supplierController.updateSupplier);

// Delete supplier
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
