
const Stock = require('../models/stockModel');

// Get all stock
exports.getAllStock = async (req, res) => {
    try {
        const stock = await Stock.getAllStock();

        res.status(200).json(stock);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get stock by fruit ID
exports.getStockByFruitId = async (req, res) => {
    try {
        const stock = await Stock.getStockByFruitId(req.params.id);

        if (stock.length === 0) {
            return res.status(404).json({
                message: 'Stock not found'
            });
        }

        res.status(200).json(stock);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update stock
exports.updateStock = async (req, res) => {
    try {
        const { available_quantity } = req.body;

        if (
            available_quantity === undefined ||
            !Number.isInteger(available_quantity) ||
            available_quantity < 0
        ) {
            return res.status(400).json({
                message: 'Enter a valid stock quantity'
            });
        }

        const result = await Stock.updateStock(
            req.params.id,
            available_quantity
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Stock record not found'
            });
        }

        res.status(200).json({
            message: 'Stock updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
