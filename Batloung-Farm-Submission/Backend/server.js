
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/db');

const supplierRoutes = require('./routes/supplierRoutes');
const fruitRoutes = require('./routes/fruitRoutes');
const stockRoutes = require('./routes/stockRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const purchaseDetailRoutes = require('./routes/purchaseDetailRoutes');
const saleRoutes = require('./routes/saleRoutes');
const salesDetailRoutes = require('./routes/salesDetailRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Supplier API routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/fruits', fruitRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/purchase-details', purchaseDetailRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/sales-details', salesDetailRoutes);
app.use('/api/reports', reportRoutes);
// Home route
app.get('/', (req, res) => {
    res.send('Batloung Farm Distribution Management System API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    testConnection();
});
