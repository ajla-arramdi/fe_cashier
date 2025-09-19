import { useState, useEffect } from 'react';
import ProductAPI from './ProductAPI';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    stok: '',
    harga: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        nama: product.nama || '',
        kategori: product.kategori || '',
        stok: product.stok || '',
        harga: product.harga || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama produk wajib diisi';
    }
    
    if (formData.stok === '' || isNaN(formData.stok) || parseInt(formData.stok) < 0) {
      newErrors.stok = 'Stok harus berupa angka positif';
    }
    
    if (formData.harga === '' || isNaN(formData.harga) || parseFloat(formData.harga) < 0) {
      newErrors.harga = 'Harga harus berupa angka positif';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const productData = {
        nama: formData.nama.trim(),
        kategori: formData.kategori.trim() || null,
        stok: parseInt(formData.stok),
        harga: parseFloat(formData.harga)
      };
      
      if (product) {
        // Update existing product
        await ProductAPI.updateProduct(product.id, productData);
      } else {
        // Create new product
        await ProductAPI.createProduct(productData);
      }
      
      onSave();
      setFormData({ nama: '', kategori: '', stok: '', harga: '' });
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Terjadi kesalahan saat menyimpan produk. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="nama">Nama Produk *</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className={errors.nama ? 'error' : ''}
            placeholder="Masukkan nama produk"
          />
          {errors.nama && <span className="error-message">{errors.nama}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="kategori">Kategori</label>
          <input
            type="text"
            id="kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            placeholder="Masukkan kategori produk (opsional)"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stok">Stok *</label>
            <input
              type="number"
              id="stok"
              name="stok"
              value={formData.stok}
              onChange={handleChange}
              className={errors.stok ? 'error' : ''}
              min="0"
              placeholder="0"
            />
            {errors.stok && <span className="error-message">{errors.stok}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="harga">Harga (Rp) *</label>
            <input
              type="number"
              id="harga"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              className={errors.harga ? 'error' : ''}
              min="0"
              step="100"
              placeholder="0"
            />
            {errors.harga && <span className="error-message">{errors.harga}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : (product ? 'Update Produk' : 'Tambah Produk')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;