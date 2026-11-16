
const { db } = require('../config/db');

// Get total sales and revenue
async function getSalesSummary() {
    const sql = `
        SELECT
            COUNT(*) AS total_sales,
            SUM(total_amount) AS total_revenue,
            SUM(amount_paid) AS total_paid,
            SUM(total_amount - amount_paid) AS outstanding_balance
        FROM sales
    `;

    const [rows] = await db.query(sql);
    return rows[0];
}

// Get most sold fruits
async function getMostSoldFruits() {
    const sql = `
        SELECT
            fruits.fruit_name,
            SUM(sales_details.quantity) AS total_quantity_sold
        FROM sales_details
        JOIN fruits
            ON sales_details.fruit_id = fruits.fruit_id
        GROUP BY fruits.fruit_id, fruits.fruit_name
        ORDER BY total_quantity_sold DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get top vendors report
async function getTopVendors() {
    const sql = `
        SELECT
            vendors.vendor_name,
            SUM(sales_details.quantity) AS total_quantity_bought
        FROM sales
        JOIN vendors
            ON sales.vendor_id = vendors.vendor_id
        JOIN sales_details
            ON sales.sale_id = sales_details.sale_id
        GROUP BY vendors.vendor_id, vendors.vendor_name
        ORDER BY total_quantity_bought DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get current stock report
async function getStockReport() {
    const sql = `
        SELECT
            fruits.fruit_name,
            stock.packaging_size,
            stock.available_quantity
        FROM stock
        JOIN fruits
            ON stock.fruit_id = fruits.fruit_id
        ORDER BY fruits.fruit_name, stock.packaging_size
    `;

    const [rows] = await db.query(sql);
    return rows;
}

module.exports = {
    getSalesSummary,
    getMostSoldFruits,
    getTopVendors,
    getStockReport
};
