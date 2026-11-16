# Batloung Farm Management System

## 1. Project Overview
The Batloung Farm Management System is a web-based application developed to manage fruit distribution operations. It helps the farm manage suppliers, fruits, vendors, purchases, sales and stock.

## 2. Technologies Used
- React.js – Frontend development
- Node.js – Backend development
- Express.js – REST API
- MySQL – Database management
- JavaScript – Programming language
- CSS – User interface styling

## 3. System Features
- Dashboard with business summaries
- Supplier management
- Fruit management
- Vendor management
- Purchase management
- Sales management
- Stock management by fruit and packaging size
- Payment recording
- Business reports
- Automatic stock updates
- Sales and purchase calculations

## 4. Database Design
The system uses MySQL and contains eight main tables:
1. Suppliers
2. Fruits
3. Vendors
4. Purchases
5. Purchase_Details
6. Sales
7. Sales_Details
8. Stock

The database file is available in the `Database` folder.

## 5. Project Structure
- `Backend/` – Node.js and Express API
- `Frontend/` – React application
- `Database/` – MySQL database export
- `Report/` – Project documentation
- `Screenshots/` – System screenshots

## 6. How to Run the Project

### Backend
1. Install Node.js and MySQL.
2. Import the database from `Database/batloung_farm.sql`.
3. Configure your database credentials in a `.env` file inside the Backend folder.
4. Open the Backend folder in the terminal.
5. Run `npm install`.
6. Run `npm run dev`.

### Frontend
1. Open the Frontend folder in the terminal.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000` in your browser.

## 7. Project Purpose
The purpose of this project is to improve the management of farm distribution activities through an organised digital system.

## 8. Developer
Developed as part of the Web Application Development coursework.
