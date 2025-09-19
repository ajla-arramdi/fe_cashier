import { useState, useEffect } from 'react';
import ProductAPI from '../products/ProductAPI';
import ProductForm from '../products/ProductForm';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [refreshFlag]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductAPI.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat daftar produk. Silakan coba lagi.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) {
      try {
        await ProductAPI.deleteProduct(id);
        // Refresh the product list
        setRefreshFlag(prev => !prev);
        alert('Produk berhasil dihapus');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Gagal menghapus produk. Silakan coba lagi.');
      }
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingProduct(null);
    // Refresh the product list
    setRefreshFlag(prev => !prev);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="product-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Memuat data produk...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-management">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button onClick={fetchProducts} className="btn btn-primary">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-management">
      <div className="product-header">
        <h2>Daftar Produk</h2>
        <button onClick={handleAddProduct} className="btn btn-primary">
          Tambah Produk
        </button>
      </div>

      {showForm ? (
        <ProductForm 
          product={editingProduct} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      ) : (
        <>
          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>Belum ada produk</h3>
              <p>Anda belum menambahkan produk apa pun.</p>
              <button onClick={handleAddProduct} className="btn btn-primary">
                Tambah Produk Pertama
              </button>
            </div>
          ) : (
            <div className="product-table-container">
              <div className="table-header">
                <div className="search-box">
                  <input 
                    type="text" 
                    placeholder="Cari produk..." 
                    className="search-input"
                  />
                </div>
                <div className="results-info">
                  Menampilkan {products.length} produk
                </div>
              </div>
              <div className="product-table-wrapper">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama Produk</th>
                      <th>Kategori</th>
                      <th>Stok</th>
                      <th>Harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td data-label="ID">{product.id}</td>
                        <td data-label="Nama Produk">{product.nama}</td>
                        <td data-label="Kategori">{product.kategori || '-'}</td>
                        <td data-label="Stok">
                          <span className={`stock-badge ${product.stok < 10 ? 'low-stock' : ''}`}>
                            {product.stok}
                          </span>
                        </td>
                        <td data-label="Harga">Rp {parseFloat(product.harga).toLocaleString('id-ID')}</td>
                        <td data-label="Aksi">
                          <div className="action-buttons">
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className="btn btn-small btn-secondary"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id, product.nama)}
                              className="btn btn-small btn-danger"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;