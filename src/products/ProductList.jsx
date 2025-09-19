import { useState, useEffect } from 'react';
import ProductAPI from './ProductAPI';
import ProductForm from './ProductForm';

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
    return <div className="loading">Memuat data produk...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchProducts} className="btn btn-primary">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="product-management">
      <div className="header">
        <h1>Manajemen Produk</h1>
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
              <p>Belum ada produk yang tersedia.</p>
              <button onClick={handleAddProduct} className="btn btn-primary">
                Tambah Produk Pertama
              </button>
            </div>
          ) : (
            <div className="product-table-container">
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
                      <td>{product.id}</td>
                      <td>{product.nama}</td>
                      <td>{product.kategori || '-'}</td>
                      <td>{product.stok}</td>
                      <td>Rp {parseFloat(product.harga).toLocaleString('id-ID')}</td>
                      <td>
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
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;