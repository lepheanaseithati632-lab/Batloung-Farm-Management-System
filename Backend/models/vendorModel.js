const { db } = require('../config/db');

// Add a new vendor
async function addVendor(vendor) {
    const sql = `
        INSERT INTO Vendors
        (vendor_name, phone_number, location, registration_date)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        vendor.vendor_name,
        vendor.phone_number,
        vendor.location,
        vendor.registration_date || null
    ]);

    return result;
}

// Get all vendors
async function getAllVendors() {
    const [rows] = await db.query('SELECT * FROM Vendors');
    return rows;
}

// Get vendor by ID
async function getVendorById(id) {
    const [rows] = await db.query(
        'SELECT * FROM Vendors WHERE vendor_id = ?',
        [id]
    );

    return rows[0];
}

// Update vendor
async function updateVendor(id, vendor) {
    const sql = `
        UPDATE Vendors
        SET vendor_name = ?,
            phone_number = ?,
            location = ?
        WHERE vendor_id = ?
    `;

    const [result] = await db.query(sql, [
        vendor.vendor_name,
        vendor.phone_number,
        vendor.location,
        id
    ]);

    return result;
}

// Delete vendor
async function deleteVendor(id) {
    const [result] = await db.query(
        'DELETE FROM Vendors WHERE vendor_id = ?',
        [id]
    );

    return result;
}

module.exports = {
    addVendor,
    getAllVendors,
    getVendorById,
    updateVendor,
    deleteVendor
};