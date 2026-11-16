const PurchaseDetail = require('../models/purchaseDetailModel');

exports.addPurchaseDetail = async (req, res) => {
    try {
        const result = await PurchaseDetail.addPurchaseDetail(req.body);

        res.status(201).json({
            message: 'Purchase detail added successfully',
            detailId: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPurchaseDetails = async (req, res) => {
    try {
        const details = await PurchaseDetail.getAllPurchaseDetails();
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPurchaseDetailsById = async (req, res) => {
    try {
        const details = await PurchaseDetail.getPurchaseDetailsById(
            req.params.id
        );

        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePurchaseDetail = async (req, res) => {
    try {
        const result = await PurchaseDetail.deletePurchaseDetail(
            req.params.id
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Purchase detail not found'
            });
        }

        res.status(200).json({
            message: 'Purchase detail deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};