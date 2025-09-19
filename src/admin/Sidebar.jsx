import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'dashboard-icon',
      path: '/admin'
    },
    {
      id: 2,
      title: 'Produk',
      icon: 'product-icon',
      path: '/admin/products'
    },
    {
      id: 3,
      title: 'Pengguna',
      icon: 'user-icon',
      path: '/admin/users'
    },
    {
      id: 4,
      title: 'Laporan',
      icon: 'report-icon',
      path: '/admin/reports'
    },
    {
      id: 5,
      title: 'Pengaturan',
      icon: 'settings-icon',
      path: '/admin/settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isOpen && (
          <div className="logo">
            <h2>Cashier Admin</h2>
          </div>
        )}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? '«' : '»'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className={`nav-icon ${item.icon}`}></span>
                {isOpen && <span className="nav-text">{item.title}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;