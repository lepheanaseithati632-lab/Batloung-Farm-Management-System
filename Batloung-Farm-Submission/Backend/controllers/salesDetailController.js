const SalesDetail = require('../models/salesDetailModel');

exports.addSalesDetail = async (req, res) => {
    try {
        const result = await SalesDetail.addSalesDetail(req.body);

        res.status(201).json({
            message: 'Sales detail added successfully',
            detailId: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllSalesDetails = async (req, res) => {
    try {
        const details = await SalesDetail.getAllSalesDetails();
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSalesDetailsBySaleId = async (req, res) => {
    try {
        const details = await SalesDetail.getSalesDetailsBySaleId(
            req.params.id
        );

        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSalesDetail = async (req, res) => {
    try {
        const result = await SalesDetail.deleteSalesDetail(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Sales detail not found'
            });
        }

        res.status(200).json({
            message: 'Sales detail deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};