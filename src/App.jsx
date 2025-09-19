import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminDashboard from './admin/AdminDashboard';
import CashierDashboard from './cashier/CashierDashboard';
import Products from './products/Products';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthService from './auth/authService';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute requiredRole="admin">
              <Products />
            </ProtectedRoute>
          } 
        />
        
        {/* Cashier routes */}
        <Route 
          path="/cashier" 
          element={
            <ProtectedRoute requiredRole="kasir">
              <CashierDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Default route */}
        <Route path="/" element={
          AuthService.isAuthenticated() ? (
            AuthService.isAdmin() ? 
            <Navigate to="/admin" /> : 
            <Navigate to="/cashier" />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </div>
  );
}

export default App;
