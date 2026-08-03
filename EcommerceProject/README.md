# Shoply – E-Commerce Store

A modern full-stack e-commerce web application developed as part of the ""CodeAlpha Full Stack Development Internship"".

## Features

* User Registration & Login
* JWT Authentication
* Product Listing
* Product Details
* Search Products
* Shopping Cart
* Checkout
* Order Processing
* My Orders
* Order Details
* Admin Dashboard
* Admin Product Management
* Admin Order Management
* Protected Routes

## Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie-based Authentication

## Project Structure

```text
EcommerceProject/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── routes/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/adnanhaider-official/CodeAlpha_Task.git
cd CodeAlpha_Task/EcommerceProject
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and add your environment variables.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Sensitive environment variables are **not included in this repository**.

The `.env` file should remain local and should not be uploaded to GitHub.

## Developed For

**CodeAlpha Full Stack Development Internship**

### Project

**E-Commerce Store**

### Repository

CodeAlpha_Task

### Developer

Adnan Haider

