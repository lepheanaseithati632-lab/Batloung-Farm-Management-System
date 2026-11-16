
const Purchase = require('../models/purchaseModel');
const PurchaseBusiness = require('../models/purchaseBusinessModel');

// Add a new purchase with automatic stock update
exports.addPurchase = async (req, res) => {
    try {
        const { purchase, items } = req.body;

        if (!purchase || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: 'Purchase information and items are required'
            });
        }

        const result = await PurchaseBusiness.createPurchase(
            purchase,
            items
        );

        res.status(201).json({
            message: 'Purchase recorded successfully',
            purchase: result
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Get all purchases
exports.getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.getAllPurchases();
        res.status(200).json(purchases);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get purchase by ID
exports.getPurchaseById = async (req, res) => {
    try {
        const purchase = await Purchase.getPurchaseById(req.params.id);

        if (!purchase) {
            return res.status(404).json({
                message: 'Purchase not found'
            });
        }

        res.status(200).json(purchase);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update purchase
exports.updatePurchase = async (req, res) => {
    try {
        const result = await Purchase.updatePurchase(
            req.params.id,
            req.body
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Purchase not found'
            });
        }

        res.status(200).json({
            message: 'Purchase updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete purchase
exports.deletePurchase = async (req, res) => {
    try {
        const result = await Purchase.deletePurchase(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Purchase not found'
            });
        }

        res.status(200).json({
            message: 'Purchase deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
