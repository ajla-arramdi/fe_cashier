import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../auth/authService';

const CashierDashboard = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Cashier Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>Point of Sale</h2>
          <p>Process customer transactions and sales.</p>
          <button className="btn btn-primary">
            Open POS
          </button>
        </div>
        
        <div className="dashboard-card">
          <h2>Product Catalog</h2>
          <p>Browse available products and prices.</p>
          <button className="btn btn-primary">
            View Products
          </button>
        </div>
        
        <div className="dashboard-card">
          <h2>Recent Transactions</h2>
          <p>View your recent sales history.</p>
          <button className="btn btn-primary">
            View Transactions
          </button>
        </div>
      </main>
    </div>
  );
};

export default CashierDashboard;