const Vendor = require('../models/vendorModel');

// Add a new vendor
exports.addVendor = async (req, res) => {
    try {
        const result = await Vendor.addVendor(req.body);
        res.status(201).json({
            message: 'Vendor added successfully',
            vendorId: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.getAllVendors();
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.getVendorById(req.params.id);

        if (!vendor) {
            return res.status(404).json({
                message: 'Vendor not found'
            });
        }

        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update vendor
exports.updateVendor = async (req, res) => {
    try {
        const result = await Vendor.updateVendor(req.params.id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Vendor not found'
            });
        }

        res.status(200).json({
            message: 'Vendor updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete vendor
exports.deleteVendor = async (req, res) => {
    try {
        const result = await Vendor.deleteVendor(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Vendor not found'
            });
        }

        res.status(200).json({
            message: 'Vendor deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};