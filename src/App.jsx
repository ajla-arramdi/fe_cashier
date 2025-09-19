import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminDashboard from './admin/AdminDashboard';
import EnhancedAdminDashboard from './admin/EnhancedAdminDashboard';
import CashierDashboard from './cashier/CashierDashboard';
import Products from './products/Products';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthService from './auth/authService';
import './App.css';

// Dummy components for sidebar navigation
const UsersPage = () => <div className="users-page"><h1>Manajemen Pengguna</h1><p>Halaman untuk mengelola pengguna kasir.</p></div>;
const ReportsPage = () => <div className="reports-page"><h1>Laporan</h1><p>Halaman untuk melihat laporan penjualan.</p></div>;
const SettingsPage = () => <div className="settings-page"><h1>Pengaturan</h1><p>Halaman pengaturan sistem.</p></div>;

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
              <EnhancedAdminDashboard />
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
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requiredRole="admin">
              <UsersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <ProtectedRoute requiredRole="admin">
              <ReportsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute requiredRole="admin">
              <SettingsPage />
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
