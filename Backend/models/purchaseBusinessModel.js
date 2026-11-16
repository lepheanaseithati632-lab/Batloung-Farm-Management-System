
const { db } = require('../config/db');

async function createPurchase(purchase, items) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        let totalAmount = 0;

        // Calculate purchase total
        for (const item of items) {
            if (
                !Number.isInteger(Number(item.quantity)) ||
                Number(item.quantity) <= 0 ||
                !Number.isFinite(Number(item.unit_cost)) ||
                Number(item.unit_cost) < 0 ||
                !['Small', 'Medium', 'Large'].includes(item.packaging_size)
            ) {
                throw new Error('Invalid purchase item information');
            }

            totalAmount += Number(item.quantity) * Number(item.unit_cost);
        }

        totalAmount = Number(totalAmount.toFixed(2));

        // Create purchase record
        const [purchaseResult] = await connection.query(
            `INSERT INTO purchases
             (supplier_id, purchase_date, total_amount)
             VALUES (?, ?, ?)`,
            [
                purchase.supplier_id,
                purchase.purchase_date,
                totalAmount
            ]
        );

        const purchaseId = purchaseResult.insertId;

        // Save purchase details and update stock
        for (const item of items) {
            await connection.query(
                `INSERT INTO purchase_details
                 (purchase_id, fruit_id, quantity, unit_cost, packaging_size)
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    purchaseId,
                    item.fruit_id,
                    item.quantity,
                    item.unit_cost,
                    item.packaging_size
                ]
            );

            const [stockRows] = await connection.query(
                `SELECT stock_id
                 FROM stock
                 WHERE fruit_id = ? AND packaging_size = ?
                 FOR UPDATE`,
                [item.fruit_id, item.packaging_size]
            );

            if (stockRows.length > 0) {
                await connection.query(
                    `UPDATE stock
                     SET available_quantity = available_quantity + ?
                     WHERE stock_id = ?`,
                    [item.quantity, stockRows[0].stock_id]
                );
            } else {
                await connection.query(
                    `INSERT INTO stock
                     (fruit_id, packaging_size, available_quantity)
                     VALUES (?, ?, ?)`,
                    [
                        item.fruit_id,
                        item.packaging_size,
                        item.quantity
                    ]
                );
            }
        }

        await connection.commit();

        return {
            purchaseId,
            totalAmount,
            message: 'Purchase recorded and stock updated successfully'
        };

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
}

module.exports = { createPurchase };
