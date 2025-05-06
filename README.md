# PrintMine E-Commerce Platform

A full-stack e-commerce platform for customized products with React.js frontend and Node.js/Express backend.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)



## Features

### User Features
- ✅ User registration and authentication (JWT)
- 🔍 Product browsing with search and filters
- 🎨 Product customization (text, colors, fonts)
- 🛒 Shopping cart functionality
- 💳 Checkout process
- 📦 Order history and tracking
- 👤 User profile management

### Admin Features
- 👔 Admin dashboard
- 📦 Product management (CRUD operations)
- 📊 Order management
- 📈 Basic sales analytics

### Technical Features
- ⚡ Responsive design with Tailwind CSS
- 🔄 Real-time cart updates
- 📱 Mobile-friendly interface
- 🔒 Secure authentication
- 📝 Form validations

## Tech Stack

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Notification system
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite** - Database (with Sequelize ORM)
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling

## Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v8 or higher recommended)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhruvjaiswal2981/dhruv-ecom.git
   cd dhruv-ecom

2. Setup Backend (Server)

    ```bash
    cd backend
    npm install
    node server.js
    ```
- The backend will run on http://localhost:5000

3. Setup Frontend (Client)

    ```bash
    cd frontend
    npm install
    npm start
    ```
- Frontend will run on http://localhost:3000



## API Documentation

### Base URL
`http://localhost:5000/api`

### Authentication

| Endpoint           | Method | Description          | Required Fields               |
|--------------------|--------|----------------------|-------------------------------|
| `/auth/register`   | POST   | Register new user    | `name`, `email`, `password`   |
| `/auth/login`      | POST   | Login user           | `email`, `password`           |
| `/auth/profile`    | GET    | Get user profile     | (Requires JWT token)          |
| `/auth/profile`    | PUT    | Update user profile  | `name`, `address`, `phone` (optional) |

### Products

| Endpoint                 | Method | Description                     | Parameters                     |
|--------------------------|--------|---------------------------------|--------------------------------|
| `/products`              | GET    | Get all products                | `category`, `minPrice`, `maxPrice`, `search`, `sort` |
| `/products/categories`   | GET    | Get all product categories      | -                              |
| `/products/:id`          | GET    | Get single product              | -                              |
| `/products`              | POST   | Create new product (Admin)      | `name`, `description`, `price`, `stock`, `category`, `customizable` |
| `/products/:id`          | PUT    | Update product (Admin)          | `name`, `description`, `price`, `stock`, `category`, `customizable` |
| `/products/:id`          | DELETE | Delete product (Admin)          | -                              |

### Cart

| Endpoint           | Method | Description             | Required                      |
|--------------------|--------|-------------------------|-------------------------------|
| `/cart`            | GET    | Get user's cart         | (Requires JWT token)          |
| `/cart`            | POST   | Add item to cart        | `productId`, `quantity`, `customization` (optional) |
| `/cart/:id`        | PUT    | Update cart item        | `quantity`, `customization`   |
| `/cart/:id`        | DELETE | Remove item from cart   | -                             |
| `/cart`            | DELETE | Clear cart              | -                             |

### Orders

| Endpoint           | Method | Description             | Required Fields               |
|--------------------|--------|-------------------------|-------------------------------|
| `/orders`          | POST   | Create new order        | `shippingAddress`, `paymentMethod` |
| `/orders`          | GET    | Get user's orders       | (Requires JWT token)          |
| `/orders/:id`      | GET    | Get order details       | (Requires JWT token)          |

### Admin Endpoints

| Endpoint                     | Method | Description             | Required                      |
|------------------------------|--------|-------------------------|-------------------------------|
| `/orders/admin/all`          | GET    | Get all orders          | (Requires Admin role)         |
| `/orders/admin/:id/status`   | PUT    | Update order status     | `status`                      |


## 🚀 Deployment

- Backend Deployment
    - Live Demo: The application is hosted on Render
    - Access it here: https://dhruv-ecom.onrender.com

- Frontend Deployment
    - Live Demo: The application is hosted on Netlify.
    - Access it here: https://dhruv-ecomerce.netlify.app/

## 📌 Author

- 💻 Developed by Dhruv Jaiswal
- 🚀 Happy Coding! 🎉