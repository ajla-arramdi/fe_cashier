import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductAPI from '../products/ProductAPI';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.kategori && product.kategori.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductAPI.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManageProducts = () => {
    navigate('/admin/products');
  };

  if (loading) {
    return (
      <div className="dashboard-card">
        <div className="card-header">
          <h2>Manajemen Produk</h2>
        </div>
        <div className="card-content">
          <div className="loading">Memuat data produk...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h2>Manajemen Produk</h2>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            onClick={handleManageProducts}
            className="btn btn-primary"
          >
            Kelola Produk
          </button>
        </div>
      </div>
      <div className="card-content">
        <div className="products-summary">
          <p>Menampilkan {filteredProducts.length} dari {products.length} produk</p>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada produk yang tersedia.</p>
          </div>
        ) : (
          <div className="products-list">
            {filteredProducts.slice(0, 5).map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-info">
                  <h4>{product.nama}</h4>
                  <p className="product-category">{product.kategori || 'Tidak ada kategori'}</p>
                </div>
                <div className="product-details">
                  <span className={`stock-badge ${product.stok < 10 ? 'low-stock' : ''}`}>
                    Stok: {product.stok}
                  </span>
                  <span className="product-price">
                    Rp {parseFloat(product.harga).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;