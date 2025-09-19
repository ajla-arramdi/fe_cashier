// ProductAPI.js
const API_BASE_URL = 'http://localhost:8000/api'; // Adjust this to your Laravel backend URL

class ProductAPI {
  // Fetch all products
  static async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/produks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Fetch a single product by ID
  static async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/produks/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  // Create a new product
  static async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/produks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update an existing product
  static async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/produks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a product
  static async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/produks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }

  // Get product statistics (mock implementation)
  static async getProductStats() {
    try {
      // In a real implementation, this would fetch from your API
      // For now, we'll return mock data
      return {
        totalProducts: 42,
        totalSales: 128,
        totalRevenue: 24560000,
        lowStockItems: 5
      };
    } catch (error) {
      console.error('Error fetching product stats:', error);
      throw error;
    }
  }
}

export default ProductAPI;