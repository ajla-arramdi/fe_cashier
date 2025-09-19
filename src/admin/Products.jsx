import ProductList from '../products/ProductList';
import './Products.css';

const Products = () => {
  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Product Management</h1>
        <p className="products-subtitle">Manage your inventory and product information</p>
      </div>
      <ProductList />
    </div>
  );
};

export default Products;