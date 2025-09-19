import { useState, useEffect } from 'react';
import ProductAPI from '../products/ProductAPI';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    totalRevenue: 0,
    totalSales: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // In a real app, this would come from an API
      // For now, we'll simulate with product data
      const products = await ProductAPI.getAllProducts();
      
      const totalProducts = products.length;
      const lowStockItems = products.filter(p => p.stok < 10).length;
      // Simulate revenue and sales data
      const totalRevenue = products.reduce((sum, p) => sum + (p.harga * p.stok), 0);
      const totalSales = products.reduce((sum, p) => sum + p.stok, 0);
      
      setStats({
        totalProducts,
        lowStockItems,
        totalRevenue,
        totalSales
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="stats-loader">Memuat statistik...</div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon product-icon"></div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Total Produk</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon sales-icon"></div>
          <div className="stat-info">
            <h3>{stats.totalSales}</h3>
            <p>Total Penjualan</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue-icon"></div>
          <div className="stat-info">
            <h3>Rp {stats.totalRevenue.toLocaleString('id-ID')}</h3>
            <p>Total Pendapatan</p>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon low-stock-icon"></div>
          <div className="stat-info">
            <h3>{stats.lowStockItems}</h3>
            <p>Stok Rendah</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;