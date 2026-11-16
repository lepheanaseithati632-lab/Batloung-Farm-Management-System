
const { db } = require('../config/db');

// Add purchase detail
async function addPurchaseDetail(detail) {
    const sql = `
        INSERT INTO purchase_details
        (purchase_id, fruit_id, quantity, unit_cost, packaging_size)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        detail.purchase_id,
        detail.fruit_id,
        detail.quantity,
        detail.unit_cost,
        detail.packaging_size
    ]);

    return result;
}

// Get all purchase details
async function getAllPurchaseDetails() {
    const sql = `
        SELECT
            purchase_details.*,
            fruits.fruit_name
        FROM purchase_details
        JOIN fruits
        ON purchase_details.fruit_id = fruits.fruit_id
    `;

    const [rows] = await db.query(sql);
    return rows;
}

// Get details by purchase ID
async function getPurchaseDetailsById(id) {
    const [rows] = await db.query(
        'SELECT * FROM purchase_details WHERE purchase_id = ?',
        [id]
    );

    return rows;
}

// Delete purchase detail
async function deletePurchaseDetail(id) {
    const [result] = await db.query(
        'DELETE FROM purchase_details WHERE purchase_detail_id = ?',
        [id]
    );

    return result;
}

module.exports = {
    addPurchaseDetail,
    getAllPurchaseDetails,
    getPurchaseDetailsById,
    deletePurchaseDetail
};
