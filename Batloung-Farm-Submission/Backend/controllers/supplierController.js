
const Supplier = require('../models/supplierModel');

// Register supplier
exports.addSupplier = async (req, res) => {
    try {
        const { business_name, contact_person, phone, province, address } = req.body;

        if (!business_name || !phone || !province) {
            return res.status(400).json({
                message: 'Business name, phone and province are required'
            });
        }

        const result = await Supplier.addSupplier(req.body);

        res.status(201).json({
            message: 'Supplier registered successfully',
            supplier_id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.getAllSuppliers();
        res.status(200).json(suppliers);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.getSupplierById(req.params.id);

        if (!supplier) {
            return res.status(404).json({
                message: 'Supplier not found'
            });
        }

        res.status(200).json(supplier);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update supplier
exports.updateSupplier = async (req, res) => {
    try {
        const result = await Supplier.updateSupplier(
            req.params.id, req.body
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Supplier not found'
            });
        }

        res.status(200).json({
            message: 'Supplier updated successfully'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete supplier
exports.deleteSupplier = async (req, res) => {
    try {
        const result = await Supplier.deleteSupplier(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Supplier not found'
            });
        }

        res.status(200).json({
            message: 'Supplier deleted successfully'
        });

    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({
                message: 'Cannot delete supplier because purchases are linked to this supplier'
            });
        }

        res.status(500).json({ message: error.message });
    }
};
