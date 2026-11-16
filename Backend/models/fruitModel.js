
const { db } = require('../config/db');

// Add a new fruit
async function addFruit(fruit) {
    const sql = `INSERT INTO fruits
    (fruit_name, description, status)
    VALUES (?, ?, ?)`;

    const [result] = await db.query(sql, [
        fruit.fruit_name,
        fruit.description,
        fruit.status || 'Available'
    ]);

    return result;
}

// Get all fruits
async function getAllFruits() {
    const [rows] = await db.query('SELECT * FROM fruits');
    return rows;
}

// Get fruit by ID
async function getFruitById(id) {
    const [rows] = await db.query(
        'SELECT * FROM fruits WHERE fruit_id = ?', [id]
    );
    return rows[0];
}

// Update fruit
async function updateFruit(id, fruit) {
    const sql = `UPDATE fruits
    SET fruit_name = ?, description = ?, status = ?
    WHERE fruit_id = ?`;

    const [result] = await db.query(sql, [
        fruit.fruit_name,
        fruit.description,
        fruit.status,
        id
    ]);

    return result;
}

// Delete fruit
async function deleteFruit(id) {
    const [result] = await db.query(
        'DELETE FROM fruits WHERE fruit_id = ?', [id]
    );
    return result;
}

module.exports = {
    addFruit,
    getAllFruits,
    getFruitById,
    updateFruit,
    deleteFruit
};
