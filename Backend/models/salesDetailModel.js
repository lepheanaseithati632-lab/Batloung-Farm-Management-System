const { db } = require('../config/db');

// Add sales detail
async function addSalesDetail(detail) {
    const sql = `
        INSERT INTO Sales_Details
        (sale_id, fruit_id, packaging_size, quantity, unit_price)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        detail.sale_id,
        detail.fruit_id,
        detail.packaging_size,
        detail.quantity,
        detail.unit_price
    ]);

    return result;
}

// Get all sales details
async function getAllSalesDetails() {
    const sql = `
        SELECT
            Sales_Details.*,
            Fruits.fruit_name
        FROM Sales_Details
        JOIN Fruits
        ON Sales_Details.fruit_id = Fruits.fruit_id
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get sales details by sale ID
async function getSalesDetailsBySaleId(id) {
    const [rows] = await db.query(
        'SELECT * FROM Sales_Details WHERE sale_id = ?',
        [id]
    );

    return rows;
}

// Delete sales detail
async function deleteSalesDetail(id) {
    const [result] = await db.query(
        'DELETE FROM Sales_Details WHERE sales_detail_id = ?',
        [id]
    );

    return result;
}

module.exports = {
    addSalesDetail,
    getAllSalesDetails,
    getSalesDetailsBySaleId,
    deleteSalesDetail
};