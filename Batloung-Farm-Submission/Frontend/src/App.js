
import { useEffect, useState } from 'react';
import './App.css';

const API = 'http://localhost:5000/api';

function App() {
    const [suppliers, setSuppliers] = useState([]);
    const [fruits, setFruits] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [stock, setStock] = useState([]);
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [summary, setSummary] = useState({});
    const [activePage, setActivePage] = useState('Dashboard');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const urls = [
                'suppliers',
                'fruits',
                'vendors',
                'stock',
                'sales',
                'purchases',
                'reports/sales-summary'
            ];

            const responses = await Promise.all(
                urls.map(url => fetch(`${API}/${url}`))
            );

            const data = await Promise.all(
                responses.map(response => {
                    if (!response.ok) {
                        throw new Error('Could not load dashboard information');
                    }
                    return response.json();
                })
            );

            setSuppliers(data[0]);
            setFruits(data[1]);
            setVendors(data[2]);
            setStock(data[3]);
            setSales(data[4]);
            setPurchases(data[5]);
            setSummary(data[6]);

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    const menuItems = [
        'Dashboard',
        'Suppliers',
        'Fruits',
        'Vendors',
        'Purchases',
        'Sales',
        'Stock',
        'Reports'
    ];

    return (
        <div className="app-container">

            <aside className="sidebar">
                <div className="brand">
                    <div className="brand-icon">🌿</div>
                    <div>
                        <h2>Batloung Farm</h2>
                        <p>Distribution System</p>
                    </div>
                </div>

                <p className="menu-heading">MAIN MENU</p>

                <nav>
                    {menuItems.map(item => (
                        <button
                            key={item}
                            className={
                                activePage === item
                                    ? 'menu-item active'
                                    : 'menu-item'
                            }
                            onClick={() => setActivePage(item)}
                        >
                            <span>
                                {item === 'Dashboard' ? '▦' :
                                 item === 'Suppliers' ? '♙' :
                                 item === 'Fruits' ? '🍎' :
                                 item === 'Vendors' ? '♧' :
                                 item === 'Purchases' ? '🛒' :
                                 item === 'Sales' ? '💰' :
                                 item === 'Stock' ? '📦' : '📊'}
                            </span>
                            <span>{item}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <p>Farm Management</p>
                    <small>System Version 1.0</small>
                </div>
            </aside>

            <main className="main-content">

                <header className="topbar">
                    <div>
                        <h1>{activePage}</h1>
                        <p>Welcome to Batloung Farm Management</p>
                    </div>

                    <div className="admin-label">
                        Administrator
                    </div>
                </header>

                {loading ? (
                    <p>Loading dashboard information...</p>
                ) : (
                    <>

                        {activePage === 'Dashboard' && (
                            <>
                                <section className="welcome-card">
                                    <div>
                                        <h2>Farm Distribution Overview</h2>
                                        <p>
                                            Manage your fruits, suppliers,
                                            vendors and daily transactions.
                                        </p>
                                    </div>
                                    <div className="welcome-icon">🌱</div>
                                </section>

                                <section className="stats-grid">

                                    <div className="stat-card">
                                        <span>Total Suppliers</span>
                                        <h2>{suppliers.length}</h2>
                                        <p>Registered suppliers</p>
                                    </div>

                                    <div className="stat-card">
                                        <span>Total Fruits</span>
                                        <h2>{fruits.length}</h2>
                                        <p>Available fruit types</p>
                                    </div>

                                    <div className="stat-card">
                                        <span>Total Vendors</span>
                                        <h2>{vendors.length}</h2>
                                        <p>Registered vendors</p>
                                    </div>

                                    <div className="stat-card">
                                        <span>Total Sales</span>
                                        <h2>{summary.total_sales || 0}</h2>
                                        <p>Recorded transactions</p>
                                    </div>

                                    <div className="stat-card">
                                        <span>Total Revenue</span>
                                        <h2>
                                            M {Number(
                                                summary.total_revenue || 0
                                            ).toLocaleString()}
                                        </h2>
                                        <p>Sales value</p>
                                    </div>

                                    <div className="stat-card">
                                        <span>Outstanding Balance</span>
                                        <h2>
                                            M {Number(
                                                summary.outstanding_balance || 0
                                            ).toLocaleString()}
                                        </h2>
                                        <p>Payments still due</p>
                                    </div>

                                </section>

                                <section className="content-card">
                                    <div className="section-title">
                                        <h2>Current Stock</h2>
                                        <button onClick={loadDashboard}>
                                            Refresh
                                        </button>
                                    </div>

                                    <div className="table-wrapper">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Fruit</th>
                                                    <th>Package Size</th>
                                                    <th>Available Quantity</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {stock.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.fruit_name}</td>
                                                        <td>{item.packaging_size}</td>
                                                        <td>{item.available_quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </>
                        )}

                        {activePage === 'Suppliers' && (
                            <CrudTable
                                title="Supplier Management"
                                recordName="Supplier"
                                data={suppliers}
                                endpoint="suppliers"
                                idField="supplier_id"
                                columns={[
                                    'supplier_id',
                                    'business_name',
                                    'contact_person',
                                    'phone',
                                    'province',
                                    'address'
                                ]}
                                fields={[
                                    'business_name',
                                    'contact_person',
                                    'phone',
                                    'province',
                                    'address'
                                ]}
                                onRefresh={loadDashboard}
                            />
                        )}

                        {activePage === 'Fruits' && (
                            <CrudTable
                                title="Fruit Management"
                                recordName="Fruit"
                                data={fruits}
                                endpoint="fruits"
                                idField="fruit_id"
                                columns={[
                                    'fruit_id',
                                    'fruit_name',
                                    'description',
                                    'status'
                                ]}
                                fields={[
                                    'fruit_name',
                                    'description',
                                    'status'
                                ]}
                                onRefresh={loadDashboard}
                            />
                        )}

                        {activePage === 'Vendors' && (
                            <CrudTable
                                title="Vendor Management"
                                recordName="Vendor"
                                data={vendors}
                                endpoint="vendors"
                                idField="vendor_id"
                                columns={[
                                    'vendor_id',
                                    'vendor_name',
                                    'phone_number',
                                    'location',
                                    'registration_date'
                                ]}
                                fields={[
                                    'vendor_name',
                                    'phone_number',
                                    'location'
                                ]}
                                onRefresh={loadDashboard}
                            />
                        )}

                        {activePage === 'Purchases' && (
                            <PurchaseManagement
                                suppliers={suppliers}
                                fruits={fruits}
                                purchases={purchases}
                                onRefresh={loadDashboard}
                            />
                        )}

                        {activePage === 'Sales' && (
                            <SalesManagement
                                vendors={vendors}
                                fruits={fruits}
                                sales={sales}
                                onRefresh={loadDashboard}
                            />
                        )}

                        {activePage === 'Stock' && (
                            <StockManagement
                                stock={stock}
                                onRefresh={loadDashboard}
                            />
                        )}

                        {activePage === 'Reports' && (
                            <Reports />
                        )}

                    </>
                )}

            </main>
        </div>
    );
}


// Reusable table for displaying records
function DataTable({ title, data, columns }) {
    return (
        <section className="content-card">
            <h2>{title}</h2>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column}>
                                    {column.replaceAll('_', ' ')}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index}>
                                    {columns.map(column => (
                                        <td key={column}>
                                            {item[column] ?? '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


// Reusable management component
function CrudTable({
    title,
    recordName,
    data,
    endpoint,
    idField,
    columns,
    fields,
    onRefresh
}) {
    const [formData, setFormData] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);

    function openAddForm() {
        setFormData({});
        setEditingId(null);
        setShowForm(true);
    }

    function openEditForm(item) {
        setFormData({ ...item });
        setEditingId(item[idField]);
        setShowForm(true);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);

        try {
            const url = editingId
                ? `${API}/${endpoint}/${editingId}`
                : `${API}/${endpoint}`;

            const response = await fetch(url, {
                method: editingId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || `Could not save ${recordName.toLowerCase()}`
                );
            }

            alert(
                editingId
                    ? `${recordName} updated successfully!`
                    : `${recordName} registered successfully!`
            );

            setShowForm(false);
            setFormData({});
            setEditingId(null);

            await onRefresh();

        } catch (error) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            `Are you sure you want to delete this ${recordName.toLowerCase()}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API}/${endpoint}/${id}`,
                { method: 'DELETE' }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || `Could not delete ${recordName.toLowerCase()}`
                );
            }

            alert(`${recordName} deleted successfully!`);

            await onRefresh();

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <section className="content-card">

            <div className="section-title">
                <h2>{title}</h2>

                <button onClick={openAddForm}>
                    + Add New {recordName}
                </button>
            </div>

            {showForm && (
                <form
                    className="management-form"
                    onSubmit={handleSubmit}
                >
                    <h3>
                        {editingId
                            ? `Edit ${recordName}`
                            : `Register New ${recordName}`}
                    </h3>

                    <div className="form-grid">
                        {fields.map(field => (
                            <div className="form-group" key={field}>
                                <label>
                                    {field.replaceAll('_', ' ')}
                                </label>

                                <input
                                    type="text"
                                    value={formData[field] ?? ''}
                                    onChange={event =>
                                        setFormData({
                                            ...formData,
                                            [field]: event.target.value
                                        })
                                    }
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={saving}>
                            {saving
                                ? 'Saving...'
                                : editingId
                                    ? `Update ${recordName}`
                                    : `Save ${recordName}`}
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column}>
                                    {column.replaceAll('_', ' ')}
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1}>
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={item[idField] ?? index}>
                                    {columns.map(column => (
                                        <td key={column}>
                                            {item[column] ?? '-'}
                                        </td>
                                    ))}

                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => openEditForm(item)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(item[idField])
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </section>
    );
}


// Purchase Management component
function PurchaseManagement({
    suppliers,
    fruits,
    purchases,
    onRefresh
}) {
    const [supplierId, setSupplierId] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [items, setItems] = useState([
        {
            fruit_id: '',
            quantity: '',
            unit_cost: '',
            packaging_size: 'Small'
        }
    ]);
    const [saving, setSaving] = useState(false);

    function addItem() {
        setItems([
            ...items,
            {
                fruit_id: '',
                quantity: '',
                unit_cost: '',
                packaging_size: 'Small'
            }
        ]);
    }

    function removeItem(index) {
        if (items.length === 1) {
            alert('A purchase must contain at least one fruit.');
            return;
        }

        setItems(items.filter((item, i) => i !== index));
    }

    function updateItem(index, field, value) {
        const updatedItems = [...items];

        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value
        };

        setItems(updatedItems);
    }

    const totalAmount = items.reduce((total, item) => {
        return total +
            (Number(item.quantity) * Number(item.unit_cost));
    }, 0);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!supplierId || !purchaseDate) {
            alert('Please select a supplier and purchase date.');
            return;
        }

        const validItems = items.every(item =>
            item.fruit_id &&
            Number.isInteger(Number(item.quantity)) &&
            Number(item.quantity) > 0 &&
            item.unit_cost !== '' &&
            Number(item.unit_cost) >= 0
        );

        if (!validItems) {
            alert('Please complete all fruit purchase details correctly.');
            return;
        }

        const purchaseBody = {
            purchase: {
                supplier_id: Number(supplierId),
                purchase_date: purchaseDate
            },
            items: items.map(item => ({
                fruit_id: Number(item.fruit_id),
                quantity: Number(item.quantity),
                unit_cost: Number(item.unit_cost),
                packaging_size: item.packaging_size
            }))
        };

        setSaving(true);

        try {
            const response = await fetch(`${API}/purchases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(purchaseBody)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || 'Could not record purchase.'
                );
            }

            alert('Purchase recorded successfully! Stock has been updated.');

            setSupplierId('');
            setPurchaseDate('');
            setItems([
                {
                    fruit_id: '',
                    quantity: '',
                    unit_cost: '',
                    packaging_size: 'Small'
                }
            ]);

            await onRefresh();

        } catch (error) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <section className="content-card">
                <h2>Record New Purchase</h2>

                <form
                    className="management-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-grid">

                        <div className="form-group">
                            <label>Select Supplier</label>

                            <select
                                value={supplierId}
                                onChange={event =>
                                    setSupplierId(event.target.value)
                                }
                                required
                            >
                                <option value="">Choose Supplier</option>

                                {suppliers.map(supplier => (
                                    <option
                                        key={supplier.supplier_id}
                                        value={supplier.supplier_id}
                                    >
                                        {supplier.business_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Purchase Date</label>

                            <input
                                type="date"
                                value={purchaseDate}
                                onChange={event =>
                                    setPurchaseDate(event.target.value)
                                }
                                required
                            />
                        </div>

                    </div>

                    <h3>Purchase Items</h3>

                    {items.map((item, index) => (
                        <div className="purchase-item" key={index}>

                            <h4>Fruit Item {index + 1}</h4>

                            <div className="form-grid">

                                <div className="form-group">
                                    <label>Select Fruit</label>

                                    <select
                                        value={item.fruit_id}
                                        onChange={event =>
                                            updateItem(
                                                index,
                                                'fruit_id',
                                                event.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Choose Fruit
                                        </option>

                                        {fruits.map(fruit => (
                                            <option
                                                key={fruit.fruit_id}
                                                value={fruit.fruit_id}
                                            >
                                                {fruit.fruit_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Packaging Size</label>

                                    <select
                                        value={item.packaging_size}
                                        onChange={event =>
                                            updateItem(
                                                index,
                                                'packaging_size',
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Quantity</label>

                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={item.quantity}
                                        onChange={event =>
                                            updateItem(
                                                index,
                                                'quantity',
                                                event.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Unit Cost (M)</label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={item.unit_cost}
                                        onChange={event =>
                                            updateItem(
                                                index,
                                                'unit_cost',
                                                event.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                            </div>

                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => removeItem(index)}
                            >
                                Remove Item
                            </button>

                        </div>
                    ))}

                    <button
                        type="button"
                        className="edit-button"
                        onClick={addItem}
                    >
                        + Add Another Fruit
                    </button>

                    <div className="purchase-total">
                        <h3>
                            Total Purchase: M {totalAmount.toFixed(2)}
                        </h3>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={saving}>
                            {saving ? 'Saving Purchase...' : 'Save Purchase'}
                        </button>
                    </div>

                </form>
            </section>

            <section className="content-card">
                <h2>Purchase Records</h2>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Purchase ID</th>
                                <th>Supplier</th>
                                <th>Purchase Date</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {purchases.length === 0 ? (
                                <tr>
                                    <td colSpan="4">
                                        No purchases recorded.
                                    </td>
                                </tr>
                            ) : (
                                purchases.map(purchase => (
                                    <tr key={purchase.purchase_id}>
                                        <td>{purchase.purchase_id}</td>
                                        <td>{purchase.business_name}</td>
                                        <td>
                                            {String(purchase.purchase_date).slice(0, 10)}
                                        </td>
                                        <td>
                                            M {Number(
                                                purchase.total_amount
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}


// Sales Management component
function SalesManagement({ vendors, fruits, sales, onRefresh }) {
    const [vendorId, setVendorId] = useState('');
    const [saleDate, setSaleDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('CASH');
    const [amountPaid, setAmountPaid] = useState('');
    const [items, setItems] = useState([
        {
            fruit_id: '',
            quantity: '',
            unit_price: '',
            packaging_size: 'Small'
        }
    ]);

    const [saving, setSaving] = useState(false);

    const totalAmount = items.reduce((total, item) => {
        return total + (Number(item.quantity) * Number(item.unit_price));
    }, 0);

    function handleItemChange(index, field, value) {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    }

    function addItem() {
        setItems([
            ...items,
            {
                fruit_id: '',
                quantity: '',
                unit_price: '',
                packaging_size: 'Small'
            }
        ]);
    }

    function removeItem(index) {
        setItems(items.filter((item, i) => i !== index));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!vendorId || !saleDate || items.some(item =>
            !item.fruit_id ||
            !item.quantity ||
            !item.unit_price ||
            Number(item.quantity) <= 0 ||
            Number(item.unit_price) < 0
        )) {
            alert('Please complete all sale information correctly.');
            return;
        }

        if (Number(amountPaid) < 0 || Number(amountPaid) > totalAmount) {
            alert('Please enter a valid payment amount.');
            return;
        }

        const saleData = {
            sale: {
                vendor_id: Number(vendorId),
                sale_date: saleDate,
                payment_method: paymentMethod,
                amount_paid: Number(amountPaid)
            },
            items: items.map(item => ({
                fruit_id: Number(item.fruit_id),
                quantity: Number(item.quantity),
                unit_price: Number(item.unit_price),
                packaging_size: item.packaging_size
            }))
        };

        try {
            setSaving(true);

            const response = await fetch(`${API}/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saleData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Could not record sale.');
            }

            alert('Sale recorded successfully!');

            setVendorId('');
            setSaleDate('');
            setPaymentMethod('CASH');
            setAmountPaid('');
            setItems([
                {
                    fruit_id: '',
                    quantity: '',
                    unit_price: '',
                    packaging_size: 'Small'
                }
            ]);

            await onRefresh();

        } catch (error) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handlePayment(sale) {
        if (sale.payment_status === 'PAID') {
            alert('This sale is already fully paid.');
            return;
        }

        const balance =
            Number(sale.total_amount) - Number(sale.amount_paid);

        const amount = window.prompt(
            `Outstanding balance: ${balance.toFixed(2)}\nEnter payment amount:`
        );

        if (amount === null) {
            return;
        }

        const paymentAmount = Number(amount);

        if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
            alert('Please enter a valid amount greater than zero.');
            return;
        }

        if (paymentAmount > balance) {
            alert('Payment cannot be greater than the outstanding balance.');
            return;
        }

        try {
            const response = await fetch(
                `${API}/sales/${sale.sale_id}/payment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: paymentAmount
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Could not record payment.');
            }

            alert('Payment recorded successfully!');
            await onRefresh();

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <section className="content-card">
            <h2>Sales Management</h2>

            <form className="management-form" onSubmit={handleSubmit}>
                <div className="form-grid">

                    <div className="form-group">
                        <label>Vendor</label>
                        <select
                            value={vendorId}
                            onChange={e => setVendorId(e.target.value)}
                            required
                        >
                            <option value="">Select Vendor</option>
                            {vendors.map(vendor => (
                                <option
                                    key={vendor.vendor_id}
                                    value={vendor.vendor_id}
                                >
                                    {vendor.vendor_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Sale Date</label>
                        <input
                            type="date"
                            value={saleDate}
                            onChange={e => setSaleDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                        >
                            <option value="CASH">Cash</option>
                            <option value="MOBILE_MONEY">Mobile Money</option>
                            <option value="CREDIT">Credit</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Amount Paid</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={amountPaid}
                            onChange={e => setAmountPaid(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <h3>Sale Items</h3>

                {items.map((item, index) => (
                    <div className="purchase-item" key={index}>
                        <div className="form-grid">

                            <div className="form-group">
                                <label>Fruit</label>
                                <select
                                    value={item.fruit_id}
                                    onChange={e =>
                                        handleItemChange(
                                            index,
                                            'fruit_id',
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="">Select Fruit</option>
                                    {fruits.map(fruit => (
                                        <option
                                            key={fruit.fruit_id}
                                            value={fruit.fruit_id}
                                        >
                                            {fruit.fruit_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Packaging Size</label>
                                <select
                                    value={item.packaging_size}
                                    onChange={e =>
                                        handleItemChange(
                                            index,
                                            'packaging_size',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={e =>
                                        handleItemChange(
                                            index,
                                            'quantity',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Unit Price</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.unit_price}
                                    onChange={e =>
                                        handleItemChange(
                                            index,
                                            'unit_price',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {items.length > 1 && (
                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => removeItem(index)}
                            >
                                Remove Item
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    className="edit-button"
                    onClick={addItem}
                >
                    Add Another Fruit
                </button>

                <div className="purchase-total">
                    <h3>Total Amount: {totalAmount.toFixed(2)}</h3>
                </div>

                <div className="form-buttons">
                    <button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Record Sale'}
                    </button>
                </div>
            </form>

            <h2>Sales Records</h2>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Sale ID</th>
                            <th>Vendor</th>
                            <th>Sale Date</th>
                            <th>Total Amount</th>
                            <th>Amount Paid</th>
                            <th>Balance</th>
                            <th>Payment Status</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sales.map(sale => {
                            const balance =
                                Number(sale.total_amount) -
                                Number(sale.amount_paid);

                            return (
                                <tr key={sale.sale_id}>
                                    <td>{sale.sale_id}</td>
                                    <td>{sale.vendor_name}</td>
                                    <td>
                                        {String(sale.sale_date).slice(0, 10)}
                                    </td>
                                    <td>{Number(sale.total_amount).toFixed(2)}</td>
                                    <td>{Number(sale.amount_paid).toFixed(2)}</td>
                                    <td>{balance.toFixed(2)}</td>
                                    <td>{sale.payment_status}</td>
                                    <td>{sale.payment_method}</td>
                                    <td>
                                        {sale.payment_status !== 'PAID' ? (
                                            <button
                                                type="button"
                                                className="edit-button"
                                                onClick={() => handlePayment(sale)}
                                            >
                                                Record Payment
                                            </button>
                                        ) : (
                                            <span>Fully Paid</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}

                        {sales.length === 0 && (
                            <tr>
                                <td colSpan="9">No sales records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


// Stock Management component
function StockManagement({ stock, onRefresh }) {
    const [editingId, setEditingId] = useState(null);
    const [quantity, setQuantity] = useState('');

    function startEditing(item) {
        setEditingId(item.stock_id);
        setQuantity(item.available_quantity);
    }

    async function updateStock(stockId) {
        if (quantity === '' || Number(quantity) < 0) {
            alert('Please enter a valid stock quantity.');
            return;
        }

        try {
            const response = await fetch(`${API}/stock/${stockId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    available_quantity: Number(quantity)
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Could not update stock.');
            }

            alert('Stock updated successfully!');
            setEditingId(null);
            setQuantity('');
            await onRefresh();

        } catch (error) {
            alert(error.message);
        }
    }

    function cancelEditing() {
        setEditingId(null);
        setQuantity('');
    }

    return (
        <section className="content-card">
            <h2>Stock Management</h2>

            <p>View and update available fruit quantities.</p>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Stock ID</th>
                            <th>Fruit Name</th>
                            <th>Packaging Size</th>
                            <th>Available Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stock.map(item => (
                            <tr key={item.stock_id}>
                                <td>{item.stock_id}</td>
                                <td>{item.fruit_name}</td>
                                <td>{item.packaging_size}</td>

                                <td>
                                    {editingId === item.stock_id ? (
                                        <input
                                            type="number"
                                            min="0"
                                            value={quantity}
                                            onChange={e =>
                                                setQuantity(e.target.value)
                                            }
                                        />
                                    ) : (
                                        item.available_quantity
                                    )}
                                </td>

                                <td>
                                    {editingId === item.stock_id ? (
                                        <>
                                            <button
                                                className="edit-button"
                                                onClick={() =>
                                                    updateStock(item.stock_id)
                                                }
                                            >
                                                Save
                                            </button>

                                            <button
                                                className="cancel-button"
                                                onClick={cancelEditing}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="edit-button"
                                            onClick={() => startEditing(item)}
                                        >
                                            Update Stock
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {stock.length === 0 && (
                            <tr>
                                <td colSpan="5">No stock records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


// Reusable report table
function ReportTable({ title, data }) {
    const rows = Array.isArray(data)
        ? data
        : data && typeof data === 'object'
            ? [data]
            : [];

    return (
        <div className="content-card">
            <h2>{title}</h2>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            {rows.length > 0 &&
                                Object.keys(rows[0]).map((key, index) => (
                                    <th key={index}>
                                        {key.replace(/_/g, ' ').toUpperCase()}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i}>
                                        {value !== null && typeof value === 'object'
                                            ? JSON.stringify(value)
                                            : value ?? '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {rows.length === 0 && (
                            <tr>
                                <td>No records available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


// Reports component
function Reports() {
    const [salesSummary, setSalesSummary] = useState([]);
    const [mostSold, setMostSold] = useState([]);
    const [topVendors, setTopVendors] = useState([]);
    const [stockReport, setStockReport] = useState([]);

    useEffect(() => {
        async function loadReports() {
            try {
                const [sales, fruits, vendors, stock] = await Promise.all([
                    fetch(`${API}/reports/sales-summary`),
                    fetch(`${API}/reports/most-sold-fruits`),
                    fetch(`${API}/reports/top-vendors`),
                    fetch(`${API}/reports/stock`)
                ]);

                if (!sales.ok || !fruits.ok || !vendors.ok || !stock.ok) {
                    throw new Error('Could not load all reports.');
                }

                const salesData = await sales.json();
                const fruitsData = await fruits.json();
                const vendorsData = await vendors.json();
                const stockData = await stock.json();

                setSalesSummary(salesData);
                setMostSold(fruitsData);
                setTopVendors(vendorsData);
                setStockReport(stockData);

            } catch (error) {
                alert(error.message);
            }
        }

        loadReports();
    }, []);

    return (
        <section>
            <h2>Farm Reports</h2>

            <ReportTable
                title="Sales Summary Report"
                data={salesSummary}
            />

            <ReportTable
                title="Most Sold Fruits Report"
                data={mostSold}
            />

            <ReportTable
                title="Top Vendors Report"
                data={topVendors}
            />

            <ReportTable
                title="Current Stock Report"
                data={stockReport}
            />
        </section>
    );
}

export default App;
