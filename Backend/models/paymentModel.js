
const { db } = require('../config/db');

async function recordPayment(saleId, paymentAmount) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [sales] = await connection.query(
            `SELECT total_amount, amount_paid
             FROM Sales
             WHERE sale_id = ?
             FOR UPDATE`,
            [saleId]
        );

        if (sales.length === 0) {
            throw new Error('Sale not found');
        }

        const totalAmount = Number(sales[0].total_amount);
        const amountPaid = Number(sales[0].amount_paid);
        const payment = Number(paymentAmount);

        if (!Number.isFinite(payment) || payment <= 0) {
            throw new Error('Enter a valid payment amount');
        }

        const newAmountPaid = amountPaid + payment;

        if (newAmountPaid > totalAmount) {
            throw new Error('Payment exceeds the outstanding balance');
        }

        let paymentStatus = 'PARTIALLY_PAID';

        if (newAmountPaid === totalAmount) {
            paymentStatus = 'PAID';
        }

        await connection.query(
            `UPDATE Sales
             SET amount_paid = ?, payment_status = ?
             WHERE sale_id = ?`,
            [newAmountPaid, paymentStatus, saleId]
        );

        await connection.commit();

        return {
            saleId,
            totalAmount,
            amountPaid: newAmountPaid,
            balance: totalAmount - newAmountPaid,
            paymentStatus
        };

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
}

module.exports = { recordPayment };
