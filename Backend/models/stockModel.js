
const { db } = require('../config/db');

// Get all stock records
async function getAllStock() {
    const sql = `
        SELECT 
            stock.stock_id,
            fruits.fruit_name,
            stock.packaging_size,
            stock.available_quantity
        FROM stock
        JOIN fruits ON stock.fruit_id = fruits.fruit_id
        ORDER BY fruits.fruit_name, stock.packaging_size
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get stock by fruit ID
async function getStockByFruitId(id) {
    const sql = `
        SELECT 
            stock.stock_id,
            fruits.fruit_name,
            stock.packaging_size,
            stock.available_quantity
        FROM stock
        JOIN fruits ON stock.fruit_id = fruits.fruit_id
        WHERE stock.fruit_id = ?
    `;

    const [rows] = await db.query(sql, [id]);
    return rows;
}

// Update available stock
async function updateStock(id, quantity) {
    const sql = `
        UPDATE stock
        SET available_quantity = ?
        WHERE stock_id = ?
    `;

    const [result] = await db.query(sql, [quantity, id]);
    return result;
}

module.exports = {
    getAllStock,
    getStockByFruitId,
    updateStock
};
