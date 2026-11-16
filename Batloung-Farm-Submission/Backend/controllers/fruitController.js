
const Fruit = require('../models/fruitModel');

// Add fruit
exports.addFruit = async (req, res) => {
    try {
        const { fruit_name } = req.body;

        if (!fruit_name) {
            return res.status(400).json({
                message: 'Fruit name is required'
            });
        }

        const result = await Fruit.addFruit(req.body);

        res.status(201).json({
            message: 'Fruit added successfully',
            fruit_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all fruits
exports.getAllFruits = async (req, res) => {
    try {
        const fruits = await Fruit.getAllFruits();
        res.status(200).json(fruits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get fruit by ID
exports.getFruitById = async (req, res) => {
    try {
        const fruit = await Fruit.getFruitById(req.params.id);

        if (!fruit) {
            return res.status(404).json({
                message: 'Fruit not found'
            });
        }

        res.status(200).json(fruit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update fruit
exports.updateFruit = async (req, res) => {
    try {
        const result = await Fruit.updateFruit(req.params.id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Fruit not found'
            });
        }

        res.status(200).json({
            message: 'Fruit updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete fruit
exports.deleteFruit = async (req, res) => {
    try {
        const result = await Fruit.deleteFruit(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Fruit not found'
            });
        }

        res.status(200).json({
            message: 'Fruit deleted successfully'
        });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({
                message: 'Cannot delete fruit because it is linked to other records'
            });
        }

        res.status(500).json({ message: error.message });
    }
};
