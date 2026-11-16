const { db } = require('../config/db');

// Add a purchase
async function addPurchase(purchase) {
    const sql = `
        INSERT INTO Purchases
        (supplier_id, purchase_date, total_amount)
        VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        purchase.supplier_id,
        purchase.purchase_date,
        purchase.total_amount || 0
    ]);

    return result;
}

// Get all purchases
async function getAllPurchases() {
    const [rows] = await db.query(`
        SELECT Purchases.*, Suppliers.business_name
        FROM Purchases
        JOIN Suppliers
        ON Purchases.supplier_id = Suppliers.supplier_id
    `);

    return rows;
}

// Get purchase by ID
async function getPurchaseById(id) {
    const [rows] = await db.query(
        'SELECT * FROM Purchases WHERE purchase_id = ?',
        [id]
    );

    return rows[0];
}

// Update purchase
async function updatePurchase(id, purchase) {
    const sql = `
        UPDATE Purchases
        SET supplier_id = ?,
            purchase_date = ?,
            total_amount = ?
        WHERE purchase_id = ?
    `;

    const [result] = await db.query(sql, [
        purchase.supplier_id,
        purchase.purchase_date,
        purchase.total_amount,
        id
    ]);

    return result;
}

// Delete purchase
async function deletePurchase(id) {
    const [result] = await db.query(
        'DELETE FROM Purchases WHERE purchase_id = ?',
        [id]
    );

    return result;
}

module.exports = {
    addPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase
};