import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../auth/authService';
import AdminStats from './AdminStats';
import ProductManagement from './ProductManagement';
import Sidebar from './Sidebar';
import './EnhancedAdmin.css';

const EnhancedAdminDashboard = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="enhanced-dashboard">
      <Sidebar />
      
      {/* Main Content */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <h1>Admin Dashboard</h1>
              <p>Selamat datang, {user?.name}</p>
            </div>
            <div className="header-right">
              <button onClick={handleLogout} className="logout-btn">
                <i className="icon-logout"></i>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <AdminStats />

        {/* Main Content */}
        <main className="dashboard-content">
          <div className="content-grid">
            <ProductManagement />
            
            <div className="dashboard-card">
              <div className="card-header">
                <h2>User Management</h2>
              </div>
              <div className="card-content">
                <p>Kelola akun kasir dan izin akses.</p>
                <button className="btn btn-primary">
                  Kelola Pengguna
                </button>
              </div>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Laporan</h2>
              </div>
              <div className="card-content">
                <p>Lihat laporan penjualan dan analitik.</p>
                <button className="btn btn-primary">
                  Lihat Laporan
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;