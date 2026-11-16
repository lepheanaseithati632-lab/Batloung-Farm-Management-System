
const express = require('express');
const router = express.Router();

const fruitController = require('../controllers/fruitController');

// Add fruit
router.post('/', fruitController.addFruit);

// Get all fruits
router.get('/', fruitController.getAllFruits);

// Get fruit by ID
router.get('/:id', fruitController.getFruitById);

// Update fruit
router.put('/:id', fruitController.updateFruit);

// Delete fruit
router.delete('/:id', fruitController.deleteFruit);

module.exports = router;
