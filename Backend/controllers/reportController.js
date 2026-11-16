
const Report = require('../models/reportModel');

// Get sales summary report
exports.getSalesSummary = async (req, res) => {
    try {
        const report = await Report.getSalesSummary();
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get most sold fruits report
exports.getMostSoldFruits = async (req, res) => {
    try {
        const report = await Report.getMostSoldFruits();
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get top vendors report
exports.getTopVendors = async (req, res) => {
    try {
        const report = await Report.getTopVendors();
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get current stock report
exports.getStockReport = async (req, res) => {
    try {
        const report = await Report.getStockReport();
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
