const { db } = require('../config/db');

// Add a new supplier
async function addSupplier(supplier) {
    const sql = `
        INSERT INTO Suppliers
        (business_name, contact_person, phone, province, address)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        supplier.business_name,
        supplier.contact_person,
        supplier.phone,
        supplier.province,
        supplier.address
    ]);

    return result;
}

// Get all suppliers
async function getAllSuppliers() {
    const [rows] = await db.query('SELECT * FROM Suppliers');
    return rows;
}

// Get supplier by ID
async function getSupplierById(id) {
    const [rows] = await db.query(
        'SELECT * FROM Suppliers WHERE supplier_id = ?',
        [id]
    );

    return rows[0];
}

// Update supplier
async function updateSupplier(id, supplier) {
    const sql = `
        UPDATE Suppliers
        SET business_name = ?,
            contact_person = ?,
            phone = ?,
            province = ?,
            address = ?
        WHERE supplier_id = ?
    `;

    const [result] = await db.query(sql, [
        supplier.business_name,
        supplier.contact_person,
        supplier.phone,
        supplier.province,
        supplier.address,
        id
    ]);

    return result;
}

// Delete supplier
async function deleteSupplier(id) {
    const [result] = await db.query(
        'DELETE FROM Suppliers WHERE supplier_id = ?',
        [id]
    );

    return result;
}

module.exports = {
    addSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};