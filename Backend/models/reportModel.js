
const { db } = require('../config/db');

// Get total sales and revenue
async function getSalesSummary() {
    const sql = `
        SELECT
            COUNT(*) AS total_sales,
            SUM(total_amount) AS total_revenue,
            SUM(amount_paid) AS total_paid,
            SUM(total_amount - amount_paid) AS outstanding_balance
        FROM Sales
    `;

    const [rows] = await db.query(sql);
    return rows[0];
}

// Get most sold fruits
async function getMostSoldFruits() {
    const sql = `
        SELECT
            Fruits.fruit_name,
            SUM(Sales_Details.quantity) AS total_quantity_sold
        FROM Sales_Details
        JOIN Fruits
            ON Sales_Details.fruit_id = Fruits.fruit_id
        GROUP BY Fruits.fruit_id, Fruits.fruit_name
        ORDER BY total_quantity_sold DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get top vendors report
async function getTopVendors() {
    const sql = `
        SELECT
            Vendors.vendor_name,
            SUM(Sales_Details.quantity) AS total_quantity_bought
        FROM Sales
        JOIN Vendors
            ON Sales.vendor_id = Vendors.vendor_id
        JOIN Sales_Details
            ON Sales.sale_id = Sales_Details.sale_id
        GROUP BY Vendors.vendor_id, Vendors.vendor_name
        ORDER BY total_quantity_bought DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get current stock report
async function getStockReport() {
    const sql = `
        SELECT
            Fruits.fruit_name,
            Stock.packaging_size,
            Stock.available_quantity
        FROM Stock
        JOIN Fruits
            ON Stock.fruit_id = Fruits.fruit_id
        ORDER BY Fruits.fruit_name, Stock.packaging_size
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
