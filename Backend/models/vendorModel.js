
const { db } = require('../config/db');

// Add a new vendor
async function addVendor(vendor) {
    const sql = `
        INSERT INTO vendors
        (vendor_name, phone_number, location)
        VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        vendor.vendor_name,
        vendor.phone_number,
        vendor.location
    ]);

    return result;
}

// Get all vendors
async function getAllVendors() {
    const [rows] = await db.query(
        'SELECT * FROM vendors ORDER BY registration_date DESC'
    );
    return rows;
}

// Get vendor by ID
async function getVendorById(id) {
    const [rows] = await db.query(
        'SELECT * FROM vendors WHERE vendor_id = ?',
        [id]
    );

    return rows[0];
}

// Update vendor
async function updateVendor(id, vendor) {
    const sql = `
        UPDATE vendors
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
        'DELETE FROM vendors WHERE vendor_id = ?',
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
