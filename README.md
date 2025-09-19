# Cashier Management System - Frontend

A React-based frontend for a cashier management system with separate admin and cashier dashboards.

## Features

- User authentication (Login/Register)
- Role-based access control (Admin/Cashier)
- Product management (Admin only)
- Dashboard for both admin and cashier roles

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API (Laravel) running on port 8000

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000/login`.

## Project Structure

```
src/
├── auth/          # Authentication components and services
├── admin/         # Admin dashboard components
├── cashier/       # Cashier dashboard components
├── products/      # Product management components
├── App.jsx        # Main application component with routing
└── main.jsx       # Application entry point
```

## Available Routes

- `/login` - User login
- `/register` - User registration
- `/admin` - Admin dashboard
- `/admin/products` - Product management (Admin only)
- `/cashier` - Cashier dashboard

## Authentication

The application uses token-based authentication with Laravel Sanctum. User credentials are stored in localStorage.
