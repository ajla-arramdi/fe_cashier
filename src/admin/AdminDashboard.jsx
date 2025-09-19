import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../auth/authService';
import ProductAPI from '../products/ProductAPI';
import './Admin.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    lowStockItems: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch statistics
    const fetchStats = async () => {
      try {
        const statsData = await ProductAPI.getProductStats();
        setStats(statsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: "📦",
      color: "primary"
    },
    {
      title: "Total Sales",
      value: stats.totalSales,
      icon: "💰",
      color: "success"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: "📊",
      color: "info"
    },
    {
      title: "Low Stock Items",
      value: stats.lowStockItems,
      icon: "⚠️",
      color: "warning"
    }
  ];

  const managementSections = [
    {
      title: "Product Management",
      description: "Manage your products, inventory, and pricing.",
      icon: "🛍️",
      action: () => navigate('/admin/products'),
      buttonText: "Manage Products"
    },
    {
      title: "User Management",
      description: "Manage cashier accounts and permissions.",
      icon: "👥",
      action: () => {},
      buttonText: "Manage Users"
    },
    {
      title: "Reports",
      description: "View sales reports and analytics.",
      icon: "📈",
      action: () => {},
      buttonText: "View Reports"
    }
  ];

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <div className="user-details">
              <span className="welcome-text">Welcome back,</span>
              <span className="user-name">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="admin-content">
        {/* Statistics Section */}
        <section className="stats-section">
          <h2>Overview</h2>
          <div className="stats-grid">
            {statCards.map((stat, index) => (
              <div key={index} className={`stat-card stat-card--${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3 className="stat-title">{stat.title}</h3>
                  {loading ? (
                    <div className="stat-loading">Loading...</div>
                  ) : (
                    <p className="stat-value">{stat.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Management Sections */}
        <section className="management-section">
          <h2>Management</h2>
          <div className="management-grid">
            {managementSections.map((section, index) => (
              <div key={index} className="management-card">
                <div className="card-icon">{section.icon}</div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <button 
                  onClick={section.action}
                  className="btn btn-primary"
                  disabled={!section.action || section.action.toString() === "() => {}"}
                >
                  {section.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;