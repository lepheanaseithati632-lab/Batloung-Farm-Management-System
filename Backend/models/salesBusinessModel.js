
const { db } = require('../config/db');

async function createSale(sale, items) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        let totalAmount = 0;

        // Calculate the total amount
        for (const item of items) {
            const [stock] = await connection.query(
                `SELECT available_quantity
                 FROM stock
                 WHERE fruit_id = ? AND packaging_size = ?
                 FOR UPDATE`,
                [item.fruit_id, item.packaging_size]
            );

            if (stock.length === 0) {
                throw new Error('Stock record not found');
            }

            if (stock[0].available_quantity < item.quantity) {
                throw new Error('Not enough stock available');
            }

            totalAmount += item.quantity * item.unit_price;
        }

        // Calculate payment status
        const amountPaid = Number(sale.amount_paid || 0);

        if (amountPaid < 0 || amountPaid > totalAmount) {
            throw new Error('Invalid payment amount');
        }

        let paymentStatus = 'UNPAID';

        if (amountPaid === totalAmount) {
            paymentStatus = 'PAID';
        } else if (amountPaid > 0) {
            paymentStatus = 'PARTIALLY_PAID';
        }

        // Create the sale
        const [saleResult] = await connection.query(
            `INSERT INTO sales
             (vendor_id, sale_date, payment_status, payment_method,
              amount_paid, total_amount)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                sale.vendor_id,
                sale.sale_date,
                paymentStatus,
                sale.payment_method || 'CREDIT',
                amountPaid,
                totalAmount
            ]
        );

        const saleId = saleResult.insertId;

        // Save sale items and reduce stock
        for (const item of items) {
            await connection.query(
                `INSERT INTO sales_details
                 (sale_id, fruit_id, packaging_size, quantity, unit_price)
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    saleId,
                    item.fruit_id,
                    item.packaging_size,
                    item.quantity,
                    item.unit_price
                ]
            );

            // Reduce available stock
            await connection.query(
                `UPDATE stock
                 SET available_quantity = available_quantity - ?
                 WHERE fruit_id = ? AND packaging_size = ?`,
                [
                    item.quantity,
                    item.fruit_id,
                    item.packaging_size
                ]
            );
        }

        await connection.commit();

        return {
            saleId,
            totalAmount,
            amountPaid,
            paymentStatus
        };

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
}

module.exports = { createSale };
