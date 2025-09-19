import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../auth/authService';

const AdminDashboard = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>Product Management</h2>
          <p>Manage your products, inventory, and pricing.</p>
          <button 
            onClick={() => navigate('/admin/products')}
            className="btn btn-primary"
          >
            Manage Products
          </button>
        </div>
        
        <div className="dashboard-card">
          <h2>User Management</h2>
          <p>Manage cashier accounts and permissions.</p>
          <button className="btn btn-primary">
            Manage Users
          </button>
        </div>
        
        <div className="dashboard-card">
          <h2>Reports</h2>
          <p>View sales reports and analytics.</p>
          <button className="btn btn-primary">
            View Reports
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;