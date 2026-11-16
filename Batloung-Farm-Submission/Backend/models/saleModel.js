const { db } = require('../config/db');

// Add a sale
async function addSale(sale) {
    const sql = `
        INSERT INTO Sales
        (vendor_id, sale_date, payment_status, payment_method,
         amount_paid, total_amount)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        sale.vendor_id,
        sale.sale_date,
        sale.payment_status || 'UNPAID',
        sale.payment_method || 'CREDIT',
        sale.amount_paid || 0,
        sale.total_amount
    ]);

    return result;
}

// Get all sales
async function getAllSales() {
    const sql = `
        SELECT Sales.*, Vendors.vendor_name
        FROM Sales
        JOIN Vendors ON Sales.vendor_id = Vendors.vendor_id
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get sale by ID
async function getSaleById(id) {
    const [rows] = await db.query(
        'SELECT * FROM Sales WHERE sale_id = ?',
        [id]
    );

    return rows[0];
}

// Update sale
async function updateSale(id, sale) {
    const sql = `
        UPDATE Sales
        SET vendor_id = ?,
            sale_date = ?,
            payment_status = ?,
            payment_method = ?,
            amount_paid = ?,
            total_amount = ?
        WHERE sale_id = ?
    `;

    const [result] = await db.query(sql, [
        sale.vendor_id,
        sale.sale_date,
        sale.payment_status,
        sale.payment_method,
        sale.amount_paid,
        sale.total_amount,
        id
    ]);

    return result;
}

// Delete sale
async function deleteSale(id) {
    const [result] = await db.query(
        'DELETE FROM Sales WHERE sale_id = ?',
        [id]
    );

    return result;
}

module.exports = {
    addSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale
};