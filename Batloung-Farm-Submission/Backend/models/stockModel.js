
const { db } = require('../config/db');

// Get all stock records
async function getAllStock() {
    const sql = `
        SELECT 
            Stock.stock_id,
            Fruits.fruit_name,
            Stock.packaging_size,
            Stock.available_quantity
        FROM Stock
        JOIN Fruits ON Stock.fruit_id = Fruits.fruit_id
        ORDER BY Fruits.fruit_name, Stock.packaging_size
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get stock by fruit ID
async function getStockByFruitId(id) {
    const sql = `
        SELECT 
            Stock.stock_id,
            Fruits.fruit_name,
            Stock.packaging_size,
            Stock.available_quantity
        FROM Stock
        JOIN Fruits ON Stock.fruit_id = Fruits.fruit_id
        WHERE Stock.fruit_id = ?
    `;

    const [rows] = await db.query(sql, [id]);
    return rows;
}

// Update available stock
async function updateStock(id, quantity) {
    const sql = `
        UPDATE Stock
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
