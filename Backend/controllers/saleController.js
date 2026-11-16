
const Sale = require('../models/saleModel');
const SalesBusiness = require('../models/salesBusinessModel');
const Payment = require('../models/paymentModel');

// Create a new sale
exports.addSale = async (req, res) => {
    try {
        const { sale, items } = req.body;

        if (!sale || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: 'Sale information and items are required'
            });
        }

        const result = await SalesBusiness.createSale(sale, items);

        res.status(201).json({
            message: 'Sale created successfully',
            sale: result
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Get all sales
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.getAllSales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get one sale
exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.getSaleById(req.params.id);

        if (!sale) {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }

        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a sale
exports.updateSale = async (req, res) => {
    try {
        const result = await Sale.updateSale(req.params.id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }

        res.status(200).json({
            message: 'Sale updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
    try {
        const result = await Sale.deleteSale(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }

        res.status(200).json({
            message: 'Sale deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Record an additional payment
exports.recordPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        const result = await Payment.recordPayment(
            req.params.id,
            amount
        );

        res.status(200).json({
            message: 'Payment recorded successfully',
            payment: result
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
