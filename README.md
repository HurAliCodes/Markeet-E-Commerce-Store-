# Markeet - Ecommerce Platform

A full-stack e-commerce application built with React, Vite, Node.js, Express, MongoDB, Cloudinary. The repository is split into three apps:

- `frontend/` - customer-facing storefront
- `admin/` - admin dashboard for catalog and order management
- `backend/` - REST API, authentication, authorization, database, file uploads, and reviews

This project is designed as a modular monorepo so the storefront, admin panel, and API can be developed and run independently during development.

## Features

### Customer Storefront
- Browse products by category and subcategory
- Search products from the storefront
- View individual product details
- Add items to cart with size-based quantities
- Persist cart data for logged-in users
- Register and log in as a customer
- Place orders using cash on delivery 
- View order history
- Read product reviews and review summaries
- Responsive layout for desktop and mobile

### Admin Dashboard
- Admin login protected by token authentication
- Add new products with multiple images
- View the full product list
- Manage customer orders
- Access the dashboard through a separate admin app

### Backend API
- JWT-based authentication for users and admins
- Product CRUD endpoints for catalog management
- Cart endpoints for user cart synchronization
- Order endpoints for order placement, listing, status updates, and cancellation
- Review endpoints for product ratings and customer feedback
- Meta endpoints for categories and subcategories
- Cloudinary upload integration for product images
- MongoDB persistence for users, products, orders, carts, and reviews

## Project Structure

```text
.
├── frontend/    # Customer storefront
├── admin/       # Admin dashboard
├── backend/     # Express API
└── start-all.bat
```

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- React Toastify
- Tailwind CSS 4
- Headless UI
- Lucide icons

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- Cloudinary for image hosting
- Stripe and Razorpay payment libraries
- CORS, bcrypt, validator, dotenv

## Backend API Overview

Base URL: `http://localhost:4000` by default.

### User
- `POST /api/user/register` - register a customer
- `POST /api/user/login` - log in a customer
- `POST /api/user/admin` - log in an admin user

### Products
- `GET /api/product/list` - list all products
- `GET /api/product/single/:productId` - get one product
- `POST /api/product/add` - add a product as admin
- `DELETE /api/product/remove/:productId` - remove a product as admin

### Cart
- `POST /api/cart/get` - get the authenticated user's cart
- `POST /api/cart/add` - add an item to the cart
- `POST /api/cart/update` - update cart quantity

### Orders
- `GET /api/order/list` - list all orders as admin
- `POST /api/order/status` - update order status as admin
- `POST /api/order/place/cod` - place a cash-on-delivery order
- `POST /api/order/place/safepay` - place an online payment order
- `GET /api/order/user` - get the authenticated user's orders
- `POST /api/order/cancel` - cancel a user order

### Reviews
- `GET /api/review/:productId` - get product reviews
- `GET /api/review/:productId/summary` - get review summary
- `GET /api/review/:productId/me` - check whether the user can review a product
- `POST /api/review` - create a review
- `PUT /api/review/:reviewId` - update a review
- `DELETE /api/review/:reviewId` - delete a review

### Meta
- `GET /api/meta/categories` - get all categories
- `GET /api/meta/sub-categories` - get all subcategories
- `GET /api/meta/sub-categories/:category` - get subcategories for one category

## Environment Variables

### Backend
Create a `.env` file inside `backend/` with the values used by the server:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

### Frontend
Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Admin
Create a `.env` file inside `admin/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Installation

1. Install dependencies for each app separately:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

2. Configure the environment variables listed above.

3. Make sure MongoDB and Cloudinary are set up before starting the backend.

## Running the Project

### Option 1: Run everything on Windows
Use the batch file from the repository root:

```bash
start-all.bat
```

This starts:
- the backend API
- the customer storefront
- the admin dashboard

### Option 2: Run each app manually

Backend:

```bash
cd backend
npm run server
```

Frontend:

```bash
cd frontend
npm run dev
```

Admin:

```bash
cd admin
npm run dev
```

## Available Scripts

### frontend/
- `npm run dev` - start the Vite development server
- `npm run build` - build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

### admin/
- `npm run dev` - start the Vite development server
- `npm run build` - build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

### backend/
- `npm run start` - start the API with Node.js
- `npm run server` - start the API with nodemon

## Notes
- The storefront hydrates the cart after authentication so cart state stays in sync after login.
- Cart items are stored by product and size, which allows the same product to exist in different sizes in the cart.
- The backend enables CORS for local development and hosted deployments.

## Deployment

For production, deploy the frontend and admin apps separately and point both apps at the deployed backend API through `VITE_BACKEND_URL`. Update the backend CORS allowlist and environment variables for your production domains and services.

## License

No license file is included yet. Add one if you plan to publish or distribute the project.
